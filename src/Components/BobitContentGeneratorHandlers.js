export const handleAddTag = (event, setSelectedTags) => {
  const newTag = event.target.value.trim();
  if (newTag !== "") {
    setSelectedTags((prevTags) => [...prevTags, newTag]);
  }
};

export const handleRandomTag = (tagValues, setSelectedTags) => {
  const randomIndex = Math.floor(Math.random() * tagValues.length);
  const randomTag = tagValues[randomIndex];
  setSelectedTags((prevTags) => [...prevTags, randomTag]);
};

export const handleRemoveTag = (tag, setSelectedTags) => {
  setSelectedTags((prevTags) => prevTags.filter((selectedTag) => selectedTag !== tag));
};

export const handleGenText = (
  setLoading,
  setPromptBlocks,
  index,
  currentBlock
) => {
  const params = {
    promptConnector_inputs: currentBlock.promptConnector_inputs,
    promptConnector_output: currentBlock.promptConnector_output,
    promptConnector_styles: currentBlock.promptConnector_styles.map(style => style.value),
    promptData_tags: currentBlock.promptData_tags,
    promptData_texts: currentBlock.promptData_texts,
    textValue: currentBlock.textValue
};


  // test (todo: fix CORS issue)
  // const url = "http://localhost:7071/api/GenerateText";

  // prod
  const code = "j_vnA8ydH6-4bGrFWLbhzP5xqoJwNk9NORFbnHwnhspoAzFuT0t2Wg==";
  const url = `https://bbmazurefunctions.azurewebsites.net/api/GenerateText?code=${code}`;
  return handleGen(url, params, setLoading).then((data) => {
    setPromptBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[index].textValue = data;
      return updatedBlocks;
    });
  });
};

export const handleCustomTagChange = (event, setCustomTag) => {
  setCustomTag(event.target.value);
};

export const handleCustomTagAdd = (customTag, setSelectedTags, setCustomTag) => {
  const newTag = customTag.trim();
  if (newTag !== "") {
    setSelectedTags((prevTags) => [...prevTags, newTag]);
    setCustomTag("");
  }
};

export const handleCopyAll = (promptBlocks) => {
  const textToCopy = promptBlocks.map((block) => block.textValue).join("\n\n");
  navigator.clipboard.writeText(textToCopy);
};
export const handleGen = (url, params, setLoading) => {
  setLoading(true);
  console.log("URL:", url);
  console.log("Params:", params);

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .finally(() => {
      setLoading(false);
    });
};

