const static_data = [
  {
    "index": "about",
    "created_at": 1530193444, 
    "title": "about",
    "image": "",
    "html": '<p>Yussan Academy is a research and development division of Id Moreteam. We are here discussing the latest technologies, what they are and how to start learning them. We also have several categories of posts that specifically discuss some of the source code on Github, available extensions, what are the advantages and disadvantages, and are they suitable for use. You also visit our <a href="https://www.youtube.com/channel/UCKLQUv8n3OadK5mkYpmZiyA" target="_blank">Youtube channel </a> , to see the video version of several posts here.</p>'
  },
  {"index": "terms-conditions",
    "created_at": 1530193444, 
    "title": "terms and conditions",
    "image": "",
    "html": '<h4>content</h4><p>content created in Yussan Academy is 100% made from Yussan Academy authors. Written by experience after the use of the software in a few days. The posted images are the result of screenshots and some digital editing to produce images that interest the reader. If there is content that we collect from sources outside of Oopsreview, we will include links and source references from the content.&nbsp;we will not publish software that smells pornography, SARA or software that is private.</p><p>&nbsp;</p>'
  },
  {
    "index": "privacy-policy",
    "created_at": 1530193444,
    "title": "privacy policy",
    "image": "",
    "html": '<h4>last update 13 Juli 2018</h4><p>Oopsreview&nbsp;currently does not require any data from users, be it personal data or use of cookies. Thank you for your attention.</p>'
  }
]

export function getData(index: String): Object {
  let data
  static_data.map((n: any) => {
    if(n.index === index) {
      data = n
    }
  })

  return data
}
