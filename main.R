library(tm.plugin.webmining)

# List of all the files you need to process, these can be local pages, or pages from a live website
pages <- c("file:///Users/tomleost/Projects/rScraper/pages/pageOne.html")

# List of all the keywords you need to find
keywords <-c("SECURITIES", "5G")

# This will get the data from a file and remove all the HTML 
getPage <- function(url) {
  res <- tryCatch(
    {
      page <- readLines(url)
      page <- extractHTMLStrip(toString(page))
      return(page)
    },
    error=function(cond){
      message("Error with geting data and striping HTML:")
      message(cond)
      return("")
    },
    warning=function(cond) {
      message("Warning with geting data and striping HTML:")
      message(cond)
      return("")
    },
    finally={
      message("\n Processed URL:", url)
    }
  )
  return(res)
}


# Main Loop
for (val in pages) {
  
  # Get striped HTML page 
  page <- getPage(val)
  
  # Get keyword match count
  occurance <- c()
  for (keyword in keywords){
    # Count the amount of matches for the keyword in the page
    count <- length(grep(keyword, page, ignore.case=FALSE))
    occurance <- c(occurance, c(keyword, count))
  }
  
  print(val)
  print(occurance)
}




