export const googleBookService = {
  query,
};

function query(queryTxt) {
  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const query = `?printType=books&q=intitle:${encodeURIComponent(queryTxt)}`;
  const url = `${baseUrl}${query}`;

  // make the request to Google Book API and return result to gooble book service client
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log(
          `Google API returned error response code ${response.status} for URL ${url}. full response: `,
          response
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.items || []) // Return items array or empty if none
    .catch((error) => {
      console.error(`Error fetching books from URL ${url}:`, error);
      throw error;
    });
}

const googleBooksMockData = {
  kind: "books#volumes",
  totalItems: 1000000,
  items: [
    {
      kind: "books#volume",
      id: "nBuA0hmspdMC",
      etag: "332N9hyAnAE",
      selfLink: "https://www.googleapis.com/books/v1/volumes/nBuA0hmspdMC",
      volumeInfo: {
        title: "Effective JavaScript",
        authors: ["David Herman"],
        publisher: "Addison-Wesley",
        publishedDate: "2012-11-26",
        description:
          "“It’s uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It’s one of the few books on JS that I’ll recommend without hesitation.” —Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language’s flexible, expressive features and how to avoid its pitfalls. No matter how long you’ve been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma’s JavaScript standardization committee, illuminates the language’s inner workings as never before—helping you take full advantage of JavaScript’s expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you’ll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript’s functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript’s unique “run-to-completion” approach to concurrency",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9780132902250",
          },
          {
            type: "ISBN_10",
            identifier: "0132902257",
          },
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 231,
        printType: "BOOK",
        categories: ["Computers"],
        averageRating: 5,
        ratingsCount: 1,
        maturityRating: "NOT_MATURE",
        allowAnonLogging: true,
        contentVersion: "2.14.11.0.preview.3",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=nBuA0hmspdMC&pg=PR1&dq=effective+javascript&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=nBuA0hmspdMC&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Effective_JavaScript.html?hl=&id=nBuA0hmspdMC",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=nBuA0hmspdMC&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "David Herman. Praise for \u003Cb\u003EEffective JavaScript\u003C/b\u003E “ Living up to the expectation of an Effective Software Development Series pro- gramming book , \u003Cb\u003EEffective JavaScript\u003C/b\u003E by Dave Herman is a must - read for anyone who wants to do serious JavaScript&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "L55nEQAAQBAJ",
      etag: "lOJhJYnCr7Q",
      selfLink: "https://www.googleapis.com/books/v1/volumes/L55nEQAAQBAJ",
      volumeInfo: {
        title: "Efficient JavaScript Automation with Grunt",
        subtitle: "Definitive Reference for Developers and Engineers",
        authors: ["Richard Johnson"],
        publisher: "HiTeX Press",
        publishedDate: "2025-06-20",
        description:
          '"Efficient JavaScript Automation with Grunt" "Efficient JavaScript Automation with Grunt" delivers a comprehensive and forward-thinking guide to mastering build automation in the modern JavaScript ecosystem. Beginning with an in-depth exploration of Grunt’s historical context and its position alongside tools like Gulp, Webpack, and npm scripts, this book offers clear guidance on when and why Grunt remains an optimal choice. Readers are introduced to the underlying philosophies of efficient automation, best practices for integrating Grunt into complex toolchains, and frameworks for future-proofing build processes amidst evolving standards. Moving seamlessly from high-level architecture to practical implementation, the book demystifies project setup, modular task structure, and maintainable configuration strategies. It provides hands-on details for leveraging both built-in and community plugins, integrating asset pipelines, testing, and quality engineering tasks into robust, reliable workflows. Dedicated chapters on custom task creation, performance tuning, and advanced file system management ensure readers can design fast, secure, and scalable automation practices suited to diverse application needs. Designed for professionals aiming to elevate their CI/CD pipelines and automation security to enterprise standards, this book extends beyond JavaScript to demonstrate Grunt’s value in polyglot and distributed environments. Readers will learn strategies for migration, modernization, and integration with modern frameworks, as well as practical advice on maintaining auditability, compliance, and team-wide adoption. Whether you’re evolving a legacy process or architecting cutting-edge DevOps automation, "Efficient JavaScript Automation with Grunt" provides the expert guidance required for sustainable success.',
        industryIdentifiers: [
          {
            type: "OTHER",
            identifier: "PKEY:6610000914845",
          },
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 288,
        printType: "BOOK",
        categories: ["Computers"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "preview-1.0.0",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=L55nEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=L55nEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=L55nEQAAQBAJ&pg=PT205&dq=effective+javascript&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=L55nEQAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Efficient_JavaScript_Automation_with_Gru.html?hl=&id=L55nEQAAQBAJ",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.com/books/download/Efficient_JavaScript_Automation_with_Gru-sample-epub.acsm?id=L55nEQAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.com/books/download/Efficient_JavaScript_Automation_with_Gru-sample-pdf.acsm?id=L55nEQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=L55nEQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003Ejs\u003C/b\u003E versions, ensuring compatibility and robustness. The caching step conserves bandwidth and reduces redundant installation of dependencies. The upload artifact step preserves ... \u003Cb\u003EEffective\u003C/b\u003E automated deployment workflows are essential.",
      },
    },
    {
      kind: "books#volume",
      id: "TIlTEQAAQBAJ",
      etag: "aiFuFQtnT5I",
      selfLink: "https://www.googleapis.com/books/v1/volumes/TIlTEQAAQBAJ",
      volumeInfo: {
        title:
          "JavaScript File Handling from Scratch: A Practical Guide with Examples",
        authors: ["William E. Clark"],
        publisher: "Walzone Press",
        publishedDate: "2025-04-03",
        description:
          '"JavaScript File Handling from Scratch: A Practical Guide with Examples" is a meticulously crafted resource dedicated to demystifying file operations within the JavaScript universe. Designed for a diverse audience ranging from aspiring developers to seasoned software engineers, this book presents a structured approach to mastering file handling, blending theoretical foundations with pragmatic insights. Starting with an introduction to essential JavaScript concepts, the book lays down the fundamentals required for effective file manipulation, highlighting the vital role JavaScript plays in both client-side and server-side environments. Each chapter of the book builds on a coherent and progressively complex framework. Readers are first guided through the establishment of a robust development environment, complete with Node.js and necessary tools. Subsequent chapters delve into the Node.js file system module, crucial for managing files efficiently. Detailed discussions cover synchronous and asynchronous programming patterns, ensuring readers are equipped with the knowledge to handle varied performance needs. The book also addresses file system navigation, cross-platform compatibility, monitoring file changes, and event handling, providing a clear pathway through the complexities of file management. Enriched with practical examples, this book offers its readers a hands-on learning experience, reinforcing the theoretical knowledge presented. By the conclusion of the text, readers will not only understand the intricacies of JavaScript file handling but will also be prepared to apply these skills in real-world scenarios. Comprehensive and clear, "JavaScript File Handling from Scratch" equips its audience with the necessary tools to navigate the increasingly important domain of JavaScript in file operations, ensuring their readiness to confront and solve modern computational challenges.',
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 91,
        printType: "BOOK",
        categories: ["Computers"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "1.1.1.0.preview.3",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=TIlTEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=TIlTEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=TIlTEQAAQBAJ&pg=PT32&dq=effective+javascript&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=TIlTEQAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/JavaScript_File_Handling_from_Scratch_A.html?hl=&id=TIlTEQAAQBAJ",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.com/books/download/JavaScript_File_Handling_from_Scratch_A-sample-epub.acsm?id=TIlTEQAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.com/books/download/JavaScript_File_Handling_from_Scratch_A-sample-pdf.acsm?id=TIlTEQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=TIlTEQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003Eeffective JavaScript\u003C/b\u003E file handling. It offers recommendations for configuring code editors to optimize the JavaScript coding experience. Basic and advanced command-line interface commands are introduced to aid efficient navigation&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "wVDCjwEACAAJ",
      etag: "nd53SPkkjt4",
      selfLink: "https://www.googleapis.com/books/v1/volumes/wVDCjwEACAAJ",
      volumeInfo: {
        title: "Effective Javascript",
        subtitle: "68 Specific Ways to Harness the Power of Javascript",
        authors: ["David Herman"],
        publishedDate: "2016-03-08",
        description:
          "\"It's uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You'll find when you finish the book that you've gained a strong and comprehensive sense of mastery.\"-Paul Irish, developer advocate, Google Chrome \"This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It's one of the few books on JS that I'll recommend without hesitation.\"-Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language's flexible, expressive features and how to avoid its pitfalls. No matter how long you've been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma's JavaScript standardization committee, illuminates the language's inner workings as never before-helping you take full advantage of JavaScript's expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you'll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You'll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript's functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript's unique \"run-to-completion\" approach to concurrency",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "1530427223",
          },
          {
            type: "ISBN_13",
            identifier: "9781530427222",
          },
        ],
        readingModes: {
          text: false,
          image: false,
        },
        pageCount: 228,
        printType: "BOOK",
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "preview-1.0.0",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=wVDCjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=wVDCjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Effective_Javascript.html?hl=&id=wVDCjwEACAAJ",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "NO_PAGES",
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=wVDCjwEACAAJ&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "NONE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "&quot;-Paul Irish, developer advocate, Google Chrome &quot;This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It&#39;s one of the few books on JS that I&#39;ll recommend without hesitation.",
      },
    },
    {
      kind: "books#volume",
      id: "4D63DwAAQBAJ",
      etag: "HEfssIQZ2bQ",
      selfLink: "https://www.googleapis.com/books/v1/volumes/4D63DwAAQBAJ",
      volumeInfo: {
        title: "Effective TypeScript",
        subtitle: "62 Specific Ways to Improve Your TypeScript",
        authors: ["Dan Vanderkam"],
        publisher: '"O\'Reilly Media, Inc."',
        publishedDate: "2019-10-17",
        description:
          "TypeScript is a typed superset of JavaScript with the potential to solve many of the headaches for which JavaScript is famous. But TypeScript has a learning curve of its own, and understanding how to use it effectively can take time. This book guides you through 62 specific ways to improve your use of TypeScript. Author Dan Vanderkam, a principal software engineer at Sidewalk Labs, shows you how to apply these ideas, following the format popularized by Effective C++ and Effective Java (both from Addison-Wesley). You’ll advance from a beginning or intermediate user familiar with the basics to an advanced user who knows how to use the language well. Effective TypeScript is divided into eight chapters: Getting to Know TypeScript TypeScript’s Type System Type Inference Type Design Working with any Types Declarations and @types Writing and Running Your Code Migrating to TypeScript",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781492053699",
          },
          {
            type: "ISBN_10",
            identifier: "1492053694",
          },
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 273,
        printType: "BOOK",
        categories: ["Computers"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: true,
        contentVersion: "1.3.3.0.preview.3",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=4D63DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=4D63DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=4D63DwAAQBAJ&pg=PT7&dq=effective+javascript&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=4D63DwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Effective_TypeScript.html?hl=&id=4D63DwAAQBAJ",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: true,
        },
        pdf: {
          isAvailable: true,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=4D63DwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... Effective Java and \u003Cb\u003EEffective JavaScript\u003C/b\u003E. If you&#39;re already comfortable working in a few different programming languages, then diving straight into the odd corners of a new one can be an effective way to challenge your mental models and&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "KnbVEAAAQBAJ",
      etag: "T7w25TWYffk",
      selfLink: "https://www.googleapis.com/books/v1/volumes/KnbVEAAAQBAJ",
      volumeInfo: {
        title: "Mastering Javascript",
        authors: ["Cybellium"],
        publisher: "Cybellium Ltd",
        publishedDate: "2023-09-06",
        description:
          "Cybellium Ltd is dedicated to empowering individuals and organizations with the knowledge and skills they need to navigate the ever-evolving computer science landscape securely and learn only the latest information available on any subject in the category of computer science including: - Information Technology (IT) - Cyber Security - Information Security - Big Data - Artificial Intelligence (AI) - Engineering - Robotics - Standards and compliance Our mission is to be at the forefront of computer science education, offering a wide and comprehensive range of resources, including books, courses, classes and training programs, tailored to meet the diverse needs of any subject in computer science. Visit https://www.cybellium.com for more books.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9798859157051",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 239,
        printType: "BOOK",
        categories: ["Computers"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.1.1.0.preview.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=KnbVEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=KnbVEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=KnbVEAAAQBAJ&pg=PA215&dq=effective+javascript&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=KnbVEAAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Mastering_Javascript.html?hl=&id=KnbVEAAAQBAJ",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.com/books/download/Mastering_Javascript-sample-pdf.acsm?id=KnbVEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=KnbVEAAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... JavaScript. As the world&#39;s most widely used programming language ... \u003Cb\u003Eeffective JavaScript\u003C/b\u003E developer. 20.1 Upcoming Proposals and Features In this section, we&#39;re going 215 Mastering Javascript Chapter 20: The Future of JavaScript.",
      },
    },
    {
      kind: "books#volume",
      id: "l8dcCgAAQBAJ",
      etag: "ENvfJAvDu/g",
      selfLink: "https://www.googleapis.com/books/v1/volumes/l8dcCgAAQBAJ",
      volumeInfo: {
        title: "Beautiful JavaScript",
        subtitle: "Leading Programmers Explain How They Think",
        authors: ["Anton Kovalyov"],
        publisher: '"O\'Reilly Media, Inc."',
        publishedDate: "2015-08-13",
        description:
          "JavaScript is arguably the most polarizing and misunderstood programming language in the world. Many have attempted to replace it as the language of the Web, but JavaScript has survived, evolved, and thrived. Why did a language created in such hurry succeed where others failed? This guide gives you a rare glimpse into JavaScript from people intimately familiar with it. Chapters contributed by domain experts such as Jacob Thornton, Ariya Hidayat, and Sara Chipps show what they love about their favorite language—whether it’s turning the most feared features into useful tools, or how JavaScript can be used for self-expression. Contributors include: Angus Croll Jonathan Barronville Sara Chipps Marijn Haverbeke Ariya Hidayat Daryl Koopersmith Anton Kovalyov Rebecca Murphey Daniel Pupius Graeme Roberts Jenn Schiffer Jacob Thornton Ben Vinegar Rick Waldron Nicholas Zakas",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781449371173",
          },
          {
            type: "ISBN_10",
            identifier: "1449371175",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 167,
        printType: "BOOK",
        categories: ["Computers"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.1.1.0.preview.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=l8dcCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=l8dcCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=l8dcCgAAQBAJ&pg=PA154&dq=effective+javascript&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=l8dcCgAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Beautiful_JavaScript.html?hl=&id=l8dcCgAAQBAJ",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: true,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=l8dcCgAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... jQuery Fundamentals, contributed to the jQuery Cookbook (O&#39;Reilly), and served as a technical reviewer for Garann Means&#39;s Node for Front-End Developers (O&#39;Reilly) and David Herman&#39;s \u003Cb\u003EEffective JavaScript\u003C/b\u003E (Addison-Wesley Professio- nal)&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "0Fr_lxPGM6QC",
      etag: "zi2L7wE7IGM",
      selfLink: "https://www.googleapis.com/books/v1/volumes/0Fr_lxPGM6QC",
      volumeInfo: {
        title: "Functional JavaScript",
        subtitle: "Introducing Functional Programming with Underscore.js",
        authors: ["Michael Fogus"],
        publisher: '"O\'Reilly Media, Inc."',
        publishedDate: "2013-06",
        description:
          "How can you overcome JavaScript language oddities and unsafe features? With this book, you’ll learn how to create code that’s beautiful, safe, and simple to understand and test by using JavaScript’s functional programming support. Author Michael Fogus shows you how to apply functional-style concepts with Underscore.js, a JavaScript library that facilitates functional programming techniques. Sample code is available on GitHub at https://github.com/funjs/book-source. Fogus helps you think in a functional way to help you minimize complexity in the programs you build. If you’re a JavaScript programmer hoping to learn functional programming techniques, or a functional programmer looking to learn JavaScript, this book is the ideal introduction. Use applicative programming techniques with first-class functions Understand how and why you might leverage variable scoping and closures Delve into higher-order functions—and learn how they take other functions as arguments for maximum advantage Explore ways to compose new functions from existing functions Get around JavaScript’s limitations for using recursive functions Reduce, hide, or eliminate the footprint of state change in your programs Practice flow-based programming with chains and functional pipelines Discover how to code without using classes",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781449360795",
          },
          {
            type: "ISBN_10",
            identifier: "1449360793",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 260,
        printType: "BOOK",
        categories: ["Computers"],
        averageRating: 4.5,
        ratingsCount: 2,
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "2.4.3.0.preview.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=0Fr_lxPGM6QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=0Fr_lxPGM6QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=0Fr_lxPGM6QC&pg=PA228&dq=effective+javascript&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=0Fr_lxPGM6QC&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Functional_JavaScript.html?hl=&id=0Fr_lxPGM6QC",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: true,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=0Fr_lxPGM6QC&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... code . On Lisp by Paul Graham ( Prentice Hall , 1993 ) Considered by many to be the definitive book on Lisp . \u003Cb\u003EEffective JavaScript\u003C/b\u003E : 68 Specific Ways to Harness the Power of JavaScript by David Herman ( Addison - Wesley , 2012 ) Like&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "b2bdDwAAQBAJ",
      etag: "vaqIAqUyud8",
      selfLink: "https://www.googleapis.com/books/v1/volumes/b2bdDwAAQBAJ",
      volumeInfo: {
        title: "JavaScript for Modern Web Development",
        subtitle: "Building a Web Application Using HTML, CSS, and JavaScript",
        authors: ["Alok Ranjan", "Abhilasha Sinha", "Ranjit Battewad"],
        publisher: "BPB Publications",
        publishedDate: "2020-04-18",
        description:
          "Beginner to Expert in Web development with JavaScript: From HTML to React-ReduxÊÊ KEY FEATURESÊ - Acquire web development skills to build independent applicationsÊ - Understand the basics of HTML, CSS, JavaScript, React and Redux - Create build beautiful applications using HTML, CSS, JavaScript, React and Redux - Learn how to debug and unit test your applications properly to build good end products - Follow best practices to write good quality code and build performant applications DESCRIPTIONÊ This book will take you on a complete journey of learning web development, starting right with the basics. The book begins with the history of web development and JavaScript, how it has evolved over these years, and how it still keeps growing with new features. Next, you will learn the basic pillars of web development - HTML, CSS, and JavaScript. You will learn about the functional, object-oriented programming and asynchronous behaviour, and how JavaScript provides for these. Empowered with the basics, you will proceed to learn the new features of JavaScript, ES2015, and the latest ES2019.Ê Next, you will apply your learning to build a real application to see how the Web takes shape.At the end, you will also have an introductory section on ReactJS, one of the modern frameworks for UI development and also develop a simple weather application using React. You will be introduced to Redux as the state container for React applications. This book will conclude with an introductory look at additional topics which can be taken up to become a professional and in building enterprise level applications. WHAT WILL YOU LEARNÊÊ By the end of the book, you will be building real web applications to put your knowledge to practice. This book introduces all the concepts to get started with web application development. To further excel in this field, you really need to practice by building a lot many applications, implementing your own ideas or imitating existing websites. Also remember to practice additional examples provided in the code bundle of the book to master this field. WHO THIS BOOK IS FORÊÊ This book can be used by people who are completely new to software development and want to get into front-end web development by starting from basics. This book can also be used by JavaScript users for a quick reference to the fundamentals of HTML, CSS, JS, and learn ReactJS with Redux, as well as the new features in JavaScript ES2019. Table of Contents 1. History of JS and how it has revolutionized web development 2. HTML: Creating Web ContentÊ 3. CSS: Making content beautiful 4. JavaScript Programming: Making application Interactive 5. Functional programming with JavaScript 6. Object-Oriented JavaScript 7. Asynchronous Programming 8. WhatÕs new in ES2019 JavaScript 9. Building an application with JavaScript 10. Debugging JavaScript Applications 11. Unit test automation 12. Build and Deploy an Application 13. JavaScript Best Practices 14. Introduction to React 15. Building an application with ReactÊ 16. State Management in React applications 17. Debugging, Testing, and Deploying React applications 18. What is next - for becoming a pro?",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9789389328721",
          },
          {
            type: "ISBN_10",
            identifier: "9389328721",
          },
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 436,
        printType: "BOOK",
        categories: ["Computers"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: true,
        contentVersion: "1.2.2.0.preview.3",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=b2bdDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=b2bdDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=b2bdDwAAQBAJ&pg=PT193&dq=effective+javascript&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=b2bdDwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/JavaScript_for_Modern_Web_Development.html?hl=&id=b2bdDwAAQBAJ",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.com/books/download/JavaScript_for_Modern_Web_Development-sample-epub.acsm?id=b2bdDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.com/books/download/JavaScript_for_Modern_Web_Development-sample-pdf.acsm?id=b2bdDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=b2bdDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... JavaScript when the execution was done by basic interpreters , to the engines available now which are much more performant and \u003Cb\u003Eeffective\u003C/b\u003E , \u003Cb\u003EJavaScript\u003C/b\u003E has come a really long way . Let&#39;s first learn about the different parts of the JavaScript&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "M-ExEQAAQBAJ",
      etag: "X9iHlX72cfg",
      selfLink: "https://www.googleapis.com/books/v1/volumes/M-ExEQAAQBAJ",
      volumeInfo: {
        title: "Data Structures and Algorithms Exam Prep",
        subtitle:
          "A Comprehensive Guide to Preparing for Data Structures and Algorithms Exams",
        authors: ["Cybellium "],
        publisher: "Cybellium Ltd",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781836794592",
          },
          {
            type: "ISBN_10",
            identifier: "1836794592",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 230,
        printType: "BOOK",
        categories: ["Study Aids"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "preview-1.0.0",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=M-ExEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=M-ExEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=M-ExEQAAQBAJ&pg=PA94&dq=effective+javascript&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
        infoLink:
          "http://books.google.com/books?id=M-ExEQAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Data_Structures_and_Algorithms_Exam_Prep.html?hl=&id=M-ExEQAAQBAJ",
      },
      saleInfo: {
        country: "IL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "IL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.com/books/download/Data_Structures_and_Algorithms_Exam_Prep-sample-pdf.acsm?id=M-ExEQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=M-ExEQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... efficient and \u003Cb\u003Eeffective JavaScript\u003C/b\u003E code. JavaScript&#39;s fundamental data structures include arrays, objects, maps, sets, and more specialized structures like TypedArrays. Each of these structures has its own characteristics, use cases&nbsp;...",
      },
    },
  ],
};
