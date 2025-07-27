// lib/portableTextComponents.ts

import React from "react";

export const portableTextComponents = {
  types: {},
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-semibold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-medium">{children}</h4>,
    normal: ({ children }: any) => <p>{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};
