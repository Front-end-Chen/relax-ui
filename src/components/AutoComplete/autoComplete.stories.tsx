import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AutoComplete, DataSourceType } from "./autoComplete";

export default {
  title: "AutoComplete",
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

export const AutoCompleteExample: ComponentStory<typeof AutoComplete> = () => {

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items);
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  return (
    <>
      <AutoComplete
        onSuggest={handleFetch}
        onSelect={(str) => {
          alert(str.value)
        }}
      />
    </>
  );
};

AutoCompleteExample.storyName = "AutoComplete事件";

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export const AutoCompleteRenderOption: ComponentStory<typeof AutoComplete> = () => {

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items);
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
       <h2>Name: {itemWithGithub.login}</h2>
       <p>url: {itemWithGithub.url}</p>
      </>
    )
  }

  return (
    <>
      <AutoComplete
        onSuggest={handleFetch}
        onSelect={(str) => {
          alert(str.value)
        }}
        renderOption={renderOption}
      />
    </>
  );
};

AutoCompleteRenderOption.storyName = "AutoComplete自定义渲染数据";