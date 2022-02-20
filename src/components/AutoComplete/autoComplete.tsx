import classNames from 'classnames';
import React, { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef, useState } from "react";
import useClickOutside from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';
import Icon from '../Icon/icon';
import Input, { InputProps } from "../Input/input";
import Transition from '../Transition/transition';

// 数据源基本类型
interface DataSourceObject {
  value: string;
}
// 可自定义传入数据源类型
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  // 设置输入框默认值
  value?: string;
  // 加载推荐列表的函数
  onSuggest: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  // 每条推荐内容的选择函数
  onSelect?: (item: DataSourceType) => void;
  // 自定义加载每条推荐内容的函数
  renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  value="",
  onSuggest,
  onSelect,
  renderOption,
  ...restProps
}) => {
  // 输入框的值
  const [inputValue, setInputValue] = useState<string>(value);
  // 推荐列表数据的数组，同时可设置是否显示推荐列表
  const [suggestion, setSuggestion] = useState<DataSourceType[]>([]);
  // 是否加载动画
  const [loading, setLoading] = useState<boolean>(false)
  // 高亮的推荐内容的索引
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  // 是否触发onSuggest函数
  const [triggerSuggest, setTriggerSuggest] = useState<boolean>(false)
  // 使用自定义防抖函数的hook，避免频繁触发onSuggest函数
  const debouncedValue = useDebounce(inputValue, 500)
  // AutoCompleteWrapper的ref，用来判断用户点击是否发生在组件以内
  const AutoCompleteWrapperRef = useRef<HTMLDivElement>(null)

  // 用户点击发生在AutoComplete组件以外，则隐藏推荐列表
  const clickOutside = () => {
    setSuggestion([])
  }
  // 使用自定义点击组件以外关闭函数的hook
  useClickOutside(AutoCompleteWrapperRef, clickOutside)

  // 使用useEffect包裹副作用
  useEffect(() => {
    // console.log(debouncedValue);
    if (debouncedValue && triggerSuggest) {
      setSuggestion([]);
      const result = onSuggest(debouncedValue);
      setLoading(true)
      if (result instanceof Promise) {
        console.log("trggler");
        result.then((data) => {
          setLoading(false)
          setSuggestion(data);
        });
      } else {
        setLoading(false)
        setSuggestion(result);
      }
    } else {
      setSuggestion([]);
    }
    setHighlightIndex(-1)
  }, [debouncedValue, onSuggest, triggerSuggest])

  // 控制高亮的推荐内容的索引
  const highlight = (index: number) => {
    if(index < 0){
      index = 0
    }
    if(index >= suggestion.length){
      index = suggestion.length - 1
    }
    setHighlightIndex(index)
  }

  // 键盘上下选择每条推荐内容回调
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    // keycode已经被弃用，请使用key！
    // console.log(e.key);
    switch (e.key) {
      case "Enter":
        suggestion[highlightIndex] && handleSelect(suggestion[highlightIndex])
        break
      case "Escape":   
        setSuggestion([])
        break
      case "ArrowDown":
        highlight(highlightIndex + 1)
        break
      case "ArrowUp":
        highlight(highlightIndex - 1)
        break
      default:
        break
    }
  };

  // 输入框内容改变回调
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    setTriggerSuggest(true);
  };

  // 每条推荐内容的选择回调
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestion([]);
    if (onSelect) {
      onSelect(item);
    }
    setTriggerSuggest(false);
  };

  // 渲染每条推荐内容
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  // 渲染整体推荐列表
  const generateDropdown = () => {
    return (
      <Transition
      in={Boolean(suggestion.length) || loading}
      animation="zoom-in-top"
      timeout={300}
      onExited={() => {setSuggestion([])}}
    >
      <ul className="relax-suggestion-list">
        {suggestion.map((item, index) => {
          const classes = classNames("suggestion-item", {
            "active": index === highlightIndex
          })
          return (
            <li
              className={classes}
              key={index}
              onClick={() => {
                handleSelect(item);
              }}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
      </Transition>
    );
  };

  return (
    <div className="relax-auto-complete" ref={AutoCompleteWrapperRef}>
      <Input 
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        {...restProps} 
      />
      {loading && 
        <div className="suggstions-loading-icon">
          <Icon icon="spinner" spin size="3x" />
        </div>}
      {suggestion.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
