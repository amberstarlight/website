// SPDX-License-Identifier: GPL-3.0-or-later

module.exports = {
  breadcrumbs: ({ page, title = "" }) => {
    const asdf = page.url;
    if (!asdf) return;

    const segments = asdf.split("/").filter((path) => !!path);

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
  },
};
