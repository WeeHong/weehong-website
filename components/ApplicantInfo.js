import { PaperClipIcon } from "@heroicons/react/solid";
import styles from "../styles/Home.module.css";

const attachments = [
  {
    name: "weehong-resume-2020-04-16.pdf",
    href: "https://www.dropbox.com/s/nj87846k65l4f9t/WeeHong%20Resume%202022-04-16.pdf?dl=1",
  },
];

const ApplicantInfo = ({ content }) => {
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 p-0 md:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
      <div className="space-y-6 lg:col-start-1 lg:col-span-2">
        {/* Description list*/}
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white/50 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 relative">
              <div className={styles.titleBg}></div>
              <h2
                id="applicant-information-title"
                className="font-ibm text-lg leading-6 font-medium text-gray-900  relative z-10"
              >
                Applicant Information
              </h2>
              <p className="font-lexend-deca mt-1 max-w-2xl text-sm text-gray-500  relative z-10">
                Personal details and application.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="font-ibm text-sm font-medium text-gray-500">
                    Position
                  </dt>
                  <dd className="font-lexend-deca mt-1 text-sm text-gray-900">
                    {content.Title}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="font-ibm text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="font-lexend-deca mt-1 text-sm">
                    <a
                      className="text-blue-600"
                      href="mailto:weehongkane@gmail.com"
                    >
                      {content.Email}
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="font-ibm text-sm font-medium text-gray-500">
                    Nationality
                  </dt>
                  <dd className="font-lexend-deca mt-1 text-sm text-gray-900">
                    {content.Nationality}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="font-ibm text-sm font-medium text-gray-500">
                    Education
                  </dt>
                  <dd className="font-lexend-deca mt-1 text-sm text-gray-900">
                    {content.Education}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-ibm text-sm font-medium text-gray-500">
                    About
                  </dt>
                  <dd className="font-lexend-deca mt-1 text-sm text-gray-900 whitespace-pre-line">
                    {content.Description}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-ibm text-sm font-medium text-gray-500">
                    Attachments
                  </dt>
                  <dd className="font-lexend-deca mt-1 text-sm text-gray-900">
                    <ul
                      role="list"
                      className="border border-gray-200 rounded-md divide-y divide-gray-200"
                    >
                      <li
                        key={content.Attachments.Name}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="w-0 flex-1 flex items-center">
                          <PaperClipIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 flex-1 w-0 truncate">
                            {content.Attachments.Name}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href={content.Attachments.URL}
                            className="font-medium text-blue-600 hover:text-blue-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
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
};

export default ApplicantInfo;
