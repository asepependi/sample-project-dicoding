const urlParser = {
  parseUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitterUrl = this.urlSplitter(url);
    return this.urlCombiner(splitterUrl);
  },
  parseUrl() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this.urlSplitter(url);
  },
  urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },
  urlCombiner(url) {
    return (url.resource ? `/${url.resource}` : '/')
    + (url.id ? '/:id' : '')
    + (url.verb ? `/${url.verb}` : '');
  },
};

export default urlParser;
