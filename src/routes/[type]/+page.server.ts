import hljs from 'highlight.js';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const mdString = (await import(`./md/${params.type}.md?raw`)).default;
  const marked = new Marked(
      markedHighlight({
          emptyLangClass: 'hljs',
          langPrefix: 'hljs language-',
          highlight(code, lang) {
              const language = hljs.getLanguage(lang) ? lang : 'plaintext';
              return hljs.highlight(code, { language }).value;
          }
      })
  );
  const html = await marked.parse(mdString);

  return {
    html: html,
  };
}