import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";

const navigations = [
  { id: "about", name: "About", href: "/", current: true },
  {
    id: "article",
    name: "Article",
    href: "/article",
    current: false,
  },
  {
    id: "experience",
    name: "Experience",
    href: "/experience",
    current: false,
  },
];

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const LinkItem = forwardRef(({ onClick, href, children, className }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={className}>
      {children}
    </a>
  );
});
LinkItem.displayName = "LinkItem";

const Navbar = () => {
  const router = useRouter();
  const { route, asPath } = useRouter();

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex justify-between h-16">
              <div className="flex ml-auto">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {navigations.map((item) => (
                    <Link href={item.href} key={item.id} passHref>
                      <LinkItem
                        className={classNames(
                          item.href == route
                            ? "border-indigo-500"
                            : "border-transparent hover:border-indigo-200 hover:border-opacity-75",
                          "text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </LinkItem>
                    </Link>
                  ))}
                  {/* 
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Calendar
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            {({ close }) => {
              return (
                <>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigations.map((item) => (
                      <Link key={item.name} href={item.href} passHref>
                        <LinkItem
                          className={classNames(
                            router.asPath === item.href || router.asPath == "/#"
                              ? "border-l-2 border-indigo-500"
                              : "border-transparent hover:border-indigo-200 hover:border-opacity-75",
                            "text-gray-500 py-2 px-3 text-sm font-medium block"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => close()}
                        >
                          {item.name}
                        </LinkItem>
                      </Link>
                    ))}
                  </div>
                </>
              );
            }}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
