import chalk from "chalk"
import { Page } from "puppeteer"

import logger from "../services/logger"
import { whitespace } from "../utils"

/**
 * Test PixelScan page.
 *
 * @param {Page} page
 * @return {Promise<string>}
 */
export const pixelscan = async (page: Page): Promise<Record<string, any>> => {
  // Load the test page.
  logger.info(`Loading pixelscan.net test...`)
  await page.goto("https://pixelscan.net", { waitUntil: "networkidle2" })
  await page.waitForTimeout(1500)
  // Extract the result element text.
  const element = await page.$("#consistency h1")
  if (!element) {
    throw new Error(`Could not find result element.`)
  }
  // Clean the text.
  const result = whitespace(
    await page.evaluate((element) => element.textContent, element)
  )
  // Notify and return result.
  if (result) {
    logger.info(chalk.green(`Success! Retrieved test page.`))
    logger.info(result)
    return { result: result }
  } else {
    logger.error(chalk.red(`Failed! No results were found.`))
    return {}
  }
}

export default pixelscan