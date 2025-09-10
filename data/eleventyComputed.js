// SPDX-License-Identifier: GPL-3.0-or-later

export const breadcrumbs = ({ page }) => {
  const pageUrl = page.url;
  if (!pageUrl) return;

  const segments = pageUrl.split("/").filter((path) => !!path);
  const breadcrumb = [{ url: "/", name: "home" }];

  let index = 1;
  let path = "";

  for (const segment of segments) {
    path += "/" + segment;

    breadcrumb.push({
      url: `${path}/`,
      name: segment,
    });

    index++;
  }

  return breadcrumb;
};
