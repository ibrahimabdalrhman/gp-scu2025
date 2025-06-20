"use client";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Breadcrumb = () => {
  let items = [
    { label: 'Home', path: '/' },
  ]
  const pathname = usePathname().split("/");
   if (pathname.length > 1) {
    pathname.forEach((item, index) => {
      if (item !== "") {
        items.push({ label: item, path: `/${item}` });
      }
    })
   }  
  return (
    <nav aria-label="Breadcrumb" className="container mt-8 bg-background"> {/* Changed from mt-32 to mt-8 */}
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
            return (
                (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0" aria-hidden="true"/>
                      )}
                      <li className="flex items-center font-semibold text-md">
                          <Link
                            href={item?.path}
                            className="text-primary hover:text-secondary transition-colors"
                          >
                            {item?.label}
                          </Link>
                      </li>
                    </React.Fragment>
                  )
            )
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;