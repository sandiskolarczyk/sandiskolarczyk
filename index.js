// 1) Create a variable to reference the README.template.md file
// 2) Make an HTTP request to The Office API to get a quote
// 3) Look through the README.template.md content and replace the static patterns ({office_quote} & {office_character}) with the dynamic result of the API request
// 4) Create/replace the contents of the README.md file with the updated README.template.md reference variable.

import "isomorphic-unfetch";

import { promises as fs } from "fs";
import { join } from "path";

async function main() {
  const readmeTemplate = (
    await fs.readFile(join(process.cwd(), "./README.template.md"))
  ).toString("utf8");
  const { data } = await (
    await fetch("https://officeapi.dev/api/quotes/random")
  ).json();
  const readme = readmeTemplate
    .replace("{{office_quote}}", `${data.content}`)
    .replace(
      "{{office_quoted_by}}",
      `${data.character.firstname} ${data.character.lastname}`
    );
  await fs.writeFile("README.md", readme);
}

main();
