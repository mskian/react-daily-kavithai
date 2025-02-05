import { useState } from "react";
import { Phone, Copy, Send, Share, X } from "lucide-react";

// eslint-disable-next-line react/prop-types
const ShareBar = ({ quote }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    { name: "WhatsApp", url: `https://api.whatsapp.com/send/?text=${encodeURIComponent(quote)}`, icon: <Phone size={16} />, className: "whatsapp" },
    { name: "Telegram", url: `https://t.me/share/url?url=${encodeURIComponent(quote)}`, icon: <Send size={16} />, className: "telegram" },
  ];

  const copyQuote = () => {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className={`floating-share ${open ? "is-active" : ""}`}>
      {copied && <div className="notification">Copied</div>}

      <div className="share-bar">
        {open && (
          <div className="share-buttons">
            {shareLinks.map((link) => (
              <a key={link.name} className={`share-btn ${link.className}`} href={link.url} target="_blank" rel="noopener noreferrer nofollow">
                {link.icon}
              </a>
            ))}
            <button className="share-btn copy" onClick={copyQuote}>
              <Copy size={16} />
            </button>
          </div>
        )}
        <button className="share-toggle" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Share size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ShareBar;
