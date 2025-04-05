import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import Modal from "../../components/modal";
import { BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { FcReddit } from "react-icons/fc";
import { useState } from "react";

type ShareResumeProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  resumeData?: any;
};

const ShareResume: React.FC<ShareResumeProps> = ({ show, setShow, resumeData }) => {
  const [buttonText, setButtonText] = useState("Copy");

  const url = `http://tabbio-app.vercel.app/live-resume/${resumeData?.resumeName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText("Copy");
      }, 3000);
    });
  };
  const text = "Here is a link to my CV!";
  const title = "Here is a link to my CV!";
  return (
    <Modal title="Share your CV" show={show} onHide={() => setShow(false)}>
      <div className="bg-white pb-6">
        <div className="flex items-center gap-4 mb-7">
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 text-white rounded-full p-2 hover:bg-blue-900"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn size={22} />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-800"
            aria-label="Share on Facebook Messenger"
          >
            <FaFacebookF size={22} />
          </a>
          <a
            href={`https://twitter.com/messages/compose?text=${text}%20${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white rounded-full p-2 hover:bg-zinc-800"
            aria-label="Share on X (Twitter)"
          >
            <BsTwitterX size={20} />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${text}%20${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
            aria-label="Share on WhatsApp"
          >
            <BsWhatsapp size={22} />
          </a>

          <a
            href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-700"
            aria-label="Share on Reddit"
          >
            <FcReddit size={22} />
          </a>
        </div>
        <div className="flex items-center border bg-neutral-300 border-stroke rounded-lg">
          <input
            type="text"
            readOnly
            className="flex-1 max-sm:w-[75%] text-gray-700 rounded-l-lg focus:outline-none bg-white focus-within:ring-0 border-none focus:border-none"
            value={resumeData?.resumeName}
          />
          <button
            className="text-zinc-900 hover:scale-105 px-4 py-1.5 font-medium ml-2"
            onClick={handleCopy}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const ShareCandidateCV: React.FC<ShareResumeProps> = ({show, setShow, resumeData}) => {
  const [buttonText, setButtonText] = useState("Copy");

  const url = `http://tabbio-app.vercel.app/profile/${resumeData?.tabbioLink}`;
  // const url = `http://localhost:5173/profile/${resumeData?.tabbioLink}`;


  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText("Copy");
      }, 3000);
    });
  };
  const text = "Check this out!";
  const title = "Check this out!";

  return (
    <Modal title={`Share ${resumeData?.name}'s CV`} show={show} onHide={() => setShow(false)}>
    <div className="bg-white pb-6">
      <div className="flex items-center gap-4 mb-7">
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white rounded-full p-2 hover:bg-blue-900"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn size={22} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-800"
          aria-label="Share on Facebook Messenger"
        >
          <FaFacebookF size={22} />
        </a>
        <a
          href={`https://twitter.com/messages/compose?text=${text}%20${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white rounded-full p-2 hover:bg-zinc-800"
          aria-label="Share on X (Twitter)"
        >
          <BsTwitterX size={20} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${text}%20${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
          aria-label="Share on WhatsApp"
        >
          <BsWhatsapp size={22} />
        </a>

        <a
          href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-700"
          aria-label="Share on Reddit"
        >
          <FcReddit size={22} />
        </a>
      </div>
      <div className="flex items-center border bg-neutral-300 border-stroke rounded-lg">
        <input
          type="text"
          readOnly
          className="flex-1 max-sm:w-[75%] text-gray-700 rounded-l-lg focus:outline-none bg-white focus-within:ring-0 border-none focus:border-none"
          value={resumeData?.tabbioLink}
        />
        <button
          className="text-zinc-900 hover:scale-105 px-4 py-1.5 font-medium ml-2"
          onClick={handleCopy}
        >
          {buttonText}
        </button>
      </div>
    </div>
    </Modal>
  );
};

export default ShareResume;
