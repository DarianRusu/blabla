module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats(["md", "html"])
  eleventyConfig.addPassthroughCopy("src/assets")

  eleventyConfig.addWatchTarget("./src/styles")
  eleventyConfig.setWatchThrottleWaitTime(100)
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  }
}
