import { PaperClipIcon } from "@heroicons/react/solid";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

const attachments = [
  {
    name: "weehong-resume-2020-04-16.pdf",
    href: "https://www.dropbox.com/s/nj87846k65l4f9t/WeeHong%20Resume%202022-04-16.pdf?dl=1",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 p-0 md:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
      <div className="space-y-6 lg:col-start-1 lg:col-span-2">
        {/* Description list*/}
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white/50 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2
                id="applicant-information-title"
                className="font-noto text-lg leading-6 font-medium text-gray-900"
              >
                Applicant Information
              </h2>
              <p className="font-ibm mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="font-noto text-sm font-medium text-gray-500">
                    Application for
                  </dt>
                  <dd className="font-ibm mt-1 text-sm text-gray-900">
                    Backend Developer
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="font-noto text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="font-ibm mt-1 text-sm text-gray-900">
                    <a
                      className="text-accent"
                      href="mailto:weehongkane@gmail.com"
                    >
                      weehongkane@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="font-noto text-sm font-medium text-gray-500">
                    Nationality
                  </dt>
                  <dd className="font-ibm mt-1 text-sm text-gray-900">
                    Malaysian /Singapore PR
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="font-noto text-sm font-medium text-gray-500">
                    Education
                  </dt>
                  <dd className="font-ibm mt-1 text-sm text-gray-900">
                    B.S. in Information Technology
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-noto text-sm font-medium text-gray-500">
                    About
                  </dt>
                  <dd className="font-ibm mt-1 text-sm text-gray-900">
                    I am a software engineer with 5+ years of experience in web
                    development and experienced in API development, testing and
                    debugging code. I am also equipped with the knowledge of
                    CI/CD and software architecture design skillsets.
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-noto text-sm font-medium text-gray-500">
                    Attachments
                  </dt>
                  <dd className="font-ibm mt-1 text-sm text-gray-900">
                    <ul
                      role="list"
                      className="border border-gray-200 rounded-md divide-y divide-gray-200"
                    >
                      {attachments.map((attachment) => (
                        <li
                          key={attachment.name}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <PaperClipIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 flex-1 w-0 truncate">
                              {attachment.name}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href={attachment.href}
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
