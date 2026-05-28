"use client";

type CoinLinks = {
  homepage?: string[];
  blockchain_site?: string[];
  subreddit_url?: string;
};

type Props = {
  links?: CoinLinks;
};

const cleanUrl = (url?: string) => {
  if (!url) return null;
  return url.startsWith("http") ? url : null;
};

export default function LinksSection({ links }: Props) {
  const homepage = cleanUrl(links?.homepage?.[0]);
  const explorer = cleanUrl(links?.blockchain_site?.[0]);
  const community = cleanUrl(links?.subreddit_url);

  return (
    <nav>
      <p className="text-xs mb-2 text-[var(--brand-black)] uppercase">Links</p>

      <div className="flex flex-col text-sm">
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 border-b hover:opacity-70 cursor-pointer"
          >
            Official Site
          </a>
        )}

        {explorer && (
          <a
            href={explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 border-b hover:opacity-70 cursor-pointer"
          >
            Explorer
          </a>
        )}

        {community && (
          <a
            href={community}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 hover:opacity-70 cursor-pointer"
          >
            Community
          </a>
        )}
      </div>
    </nav>
  );
}
