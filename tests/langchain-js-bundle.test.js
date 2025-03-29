// Basic re-export verification test
// This test simply verifies that the module successfully re-exports its imports.
// The actual functionality of these components is tested elsewhere.

// Import a selection of exports from different categories
import {
/**** Model Providers ****/

  OpenAI,
  ChatAnthropic,
  ChatMistralAI,
  Ollama,
  ChatCerebras,

/**** Core Components ****/

  BaseMessage,
  HumanMessage,
  AIMessage,
  Document,
  StringOutputParser,
  PromptTemplate,

/**** Text Splitters ****/

  TokenTextSplitter,
  RecursiveCharacterTextSplitter,

/**** Memory Components ****/

  BufferMemory,
  ChatMessageHistory,

/**** Document Loaders ****/

  CheerioWebBaseLoader,
  HTMLWebBaseLoader,

/**** Retrievers and Stores ****/

  MemoryVectorStore,
  RestorableMemoryVectorStore,

/**** Tools and Agents ****/

  Tool,
  AgentExecutor,
  ChatAgent,

/**** Chains ****/

  LLMChain,
  ConversationChain,

/**** Langgraph Components ****/

  StateGraph,
  END,

/**** Utilities ****/

  CallbackManager,
  zodToJsonSchema
} from 'langchain-js-bundle';

describe('langchain-js-bundle re-exports', () => {
  test('successfully re-exports all components', () => {
  /**** Model Providers ****/

    expect(OpenAI).toBeDefined();
    expect(ChatAnthropic).toBeDefined();
    expect(ChatMistralAI).toBeDefined();
    expect(Ollama).toBeDefined();
    expect(ChatCerebras).toBeDefined();

  /**** Core Components ****/

    expect(BaseMessage).toBeDefined();
    expect(HumanMessage).toBeDefined();
    expect(AIMessage).toBeDefined();
    expect(Document).toBeDefined();
    expect(StringOutputParser).toBeDefined();
    expect(PromptTemplate).toBeDefined();

  /**** Text Splitters ****/

    expect(TokenTextSplitter).toBeDefined();
    expect(RecursiveCharacterTextSplitter).toBeDefined();

  /**** Memory Components ****/

    expect(BufferMemory).toBeDefined();
    expect(ChatMessageHistory).toBeDefined();

  /**** Document Loaders ****/

    expect(CheerioWebBaseLoader).toBeDefined();
    expect(HTMLWebBaseLoader).toBeDefined();

  /**** Retrievers and Stores ****/

    expect(MemoryVectorStore).toBeDefined();
    expect(RestorableMemoryVectorStore).toBeDefined();

  /**** Tools and Agents ****/

    expect(Tool).toBeDefined();
    expect(AgentExecutor).toBeDefined();
    expect(ChatAgent).toBeDefined();

  /**** Chains ****/

    expect(LLMChain).toBeDefined();
    expect(ConversationChain).toBeDefined();

  /**** Langgraph Components ****/

    expect(StateGraph).toBeDefined();
    expect(END).toBeDefined();

  /**** Utilities ****/

    expect(CallbackManager).toBeDefined();
    expect(zodToJsonSchema).toBeDefined();
  });
});