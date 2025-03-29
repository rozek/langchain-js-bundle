# langchain-js-bundle #

a consolidated bundle of LangChainJS and LangGraphJS modules for AI examples

## Overview ##

LangChainJS and LangGraphJS are not _that_ easy to handle - particularly, if you want to load everything dynamically into a browser-based IDE and avoid a bundler. In order to simplify imports for my own examples and those of my students, I've created this module which bundles important classes found in LangChainJS and LangGraphJS (and also adds my [RestorableMemoryStore](https://github.com/rozek/langchain-js-restorable-memory-vectorstore))

## Installation ##

The `langchain-js-bundle` comes as an ECMAScript module (ESM). You may either install the module using `npm` (or similar) if you still plan to use a bundler:

```bash
npm install langchain-js-bundle
```

Or you may dynamically import it using an `import` expression

```javascript
const {
  ChatOpenAI, HumanMessage,SystemMessage, ChatPromptTemplate, StringOutputParser
} = await import("https://rozek.github.io/langchain-js-bundle/dist/langchain-js-bundle.js")
```

## Usage in Node.js or Browser Environments ##

Assuming that you have installed the module, you may proceed as follows

```typescript
import {
  ChatOpenAI, HumanMessage,SystemMessage, ChatPromptTemplate, StringOutputParser
} from 'langchain-js-bundle'

const Model = new ChatOpenAI({
  openAIApiKey:'enter you OpenAI API Key here',
})

async function askModel (Input) {
  const Prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage('You are a helpful assistant'),
    new HumanMessage(Input),
  ])

  const Parser = new StringOutputParser()
  const Chain  = Prompt.pipe(Model).pipe(Parser)

  return await Chain.invoke()
}

;(async () => {
  try {
    const Response = await askModel('Who was Joseph Weizenbaum?')
    console.log(Response)
  } catch (Signal) {
    console.error('chat completion failed',Signal)
  }
})()
```

## Usage within Svelte ##

For Svelte, it is recommended to import the package in a module context:

```html
<script context="module">
  import {
    ChatOpenAI, HumanMessage,SystemMessage, ChatPromptTemplate, StringOutputParser
  } from 'langchain-js-bundle'
</script>

<script>
  const Model = new ChatOpenAI({
    openAIApiKey:'enter you OpenAI API Key here',
  })

  async function askModel (Input) {
    const Prompt = ChatPromptTemplate.fromMessages([
      new SystemMessage('You are a helpful assistant'),
      new HumanMessage(Input),
    ])

    const Parser = new StringOutputParser()
    const Chain  = Prompt.pipe(Model).pipe(Parser)

    return await Chain.invoke()
  }

  ;(async () => {
    try {
      const Response = await askModel('Who was Joseph Weizenbaum?')
      console.log(Response)
    } catch (Signal) {
      console.error('chat completion failed',Signal)
    }
  })()
</script>
```

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/langchain-js-bundle/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## Test Instructions ##

`langchain-js-bundle` comes with a simple test. Just use

```bash
npm run test
```

to run it and get a report on the console.

## License ##

[MIT License](LICENSE.md)
