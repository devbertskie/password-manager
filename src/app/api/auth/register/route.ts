import { db } from '@/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // check if email exists
    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          error: 'Email already exists!',
        },
        { status: 409 },
      );
    }
    // check if username exists
    const existingUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          error: 'Username already exists',
        },

        { status: 409 },
      );
    }

    // encrypt password
    const hashedPassword = await hash(password, 10);

    // add to the db
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: 'Account Created Successfully!' },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Something went wrong!' },
        { status: 500 },
      );
    }
  }
}
