import Link from 'next/link';
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">

          <div className="mb-6 md:mb-0 flex items-center">
            <img src="/logo.webp" alt="logo" className="h-10 w-10 mr-3 rounded-full border border-gray-200" />
            <div>
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Quizzer</h3>
              <p className="text-gray-900 text-sm">
                Building in public at{' '}
                <a
                  href="https://twitter.com/dhruvtripathi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @dhruvtripathi
                </a>
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Home</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/pricing" className="text-gray-900 hover:text-blue-600">About</Link>
                </li>
                <li>
                  <Link href="/createquiz" className="text-gray-900 hover:text-blue-600">Quiz</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://twitter.com/dhruvtripathi" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-600">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/dhruv-tripathi-9848792aa/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-600">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/Dhruv7Tripathi" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-600 transition">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://twitter.com/dhruvtripathi" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-600 transition">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/dhruv-tripathi-9848792aa/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-600 transition">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
