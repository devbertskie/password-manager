import Link from 'next/link';
import React from 'react';

const FooterLayout = () => {
  return (
    <footer className="mt-auto py-2 text-center">
      <p className="font-space text-sm text-muted-foreground">
        © Copyrights 2024 |{' '}
        <Link href="/" className="text-primary">
          PassManager
        </Link>{' '}
      </p>
      <p className="text-[10px] text-muted-foreground">
        Developed by{' '}
        <a
          href="https://github.com/bertorepo"
          target="_blank"
          className="text-primary"
        >
          @devertskie
        </a>{' '}
      </p>
    </footer>
  );
};

export default FooterLayout;
