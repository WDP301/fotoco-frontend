import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { X as RemoveIcon } from 'lucide-react';

const SPLITTER_REGEX = /[\n#?=&\t,./-]+/;
const FORMATTING_REGEX = /^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g;

interface TagsInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  minItems?: number;
}

export const TagsInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      value,
      onValueChange,
      placeholder = 'Type and press Enter to add tags',
      maxItems,
      minItems,
      className,
      dir,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const [inputValue, setInputValue] = React.useState('');
    const [disableInput, setDisableInput] = React.useState(false);
    const [disableButton, setDisableButton] = React.useState(false);
    const [isValueSelected, setIsValueSelected] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');

    const parseMinItems = minItems ?? 0;
    const parseMaxItems = maxItems ?? Infinity;

    const onValueChangeHandler = React.useCallback(
      (val: string) => {
        if (!value.includes(val) && value.length < parseMaxItems) {
          onValueChange([...value, val]);
        }
      },
      [value, parseMaxItems, onValueChange]
    );

    const removeValue = React.useCallback(
      (val: string) => {
        if (value.includes(val) && value.length > parseMinItems) {
          onValueChange(value.filter((item) => item !== val));
        }
      },
      [value, parseMinItems, onValueChange]
    );

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const tags = e.clipboardData.getData('text').split(SPLITTER_REGEX);
        const newValue = [...value];
        tags.forEach((item) => {
          const parsedItem = item.replaceAll(FORMATTING_REGEX, '').trim();
          if (
            parsedItem.length > 0 &&
            !newValue.includes(parsedItem) &&
            newValue.length < parseMaxItems
          ) {
            newValue.push(parsedItem);
          }
        });
        onValueChange(newValue);
        setInputValue('');
      },
      [value, parseMaxItems, onValueChange]
    );

    const handleSelect = React.useCallback(
      (e: React.SyntheticEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const selection = target.value.substring(
          target.selectionStart ?? 0,
          target.selectionEnd ?? 0
        );
        setSelectedValue(selection);
        setIsValueSelected(selection === inputValue);
      },
      [inputValue]
    );

    React.useEffect(() => {
      const verifyDisable = () => {
        setDisableButton(value.length - 1 < parseMinItems);
        setDisableInput(value.length + 1 > parseMaxItems);
      };
      verifyDisable();
    }, [value, parseMinItems, parseMaxItems]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const target = e.currentTarget;

        const moveNext = () => {
          const nextIndex =
            activeIndex + 1 > value.length - 1 ? -1 : activeIndex + 1;
          setActiveIndex(nextIndex);
        };

        const movePrev = () => {
          const prevIndex =
            activeIndex - 1 < 0 ? value.length - 1 : activeIndex - 1;
          setActiveIndex(prevIndex);
        };

        const moveCurrent = () => {
          const newIndex =
            activeIndex - 1 <= 0
              ? value.length - 1 === 0
                ? -1
                : 0
              : activeIndex - 1;
          setActiveIndex(newIndex);
        };

        switch (e.key) {
          case 'ArrowLeft':
            if (dir === 'rtl') {
              if (value.length > 0 && activeIndex !== -1) moveNext();
            } else {
              if (value.length > 0 && target.selectionStart === 0) movePrev();
            }
            break;

          case 'ArrowRight':
            if (dir === 'rtl') {
              if (value.length > 0 && target.selectionStart === 0) movePrev();
            } else {
              if (value.length > 0 && activeIndex !== -1) moveNext();
            }
            break;

          case 'Backspace':
          case 'Delete':
            if (value.length > 0) {
              if (activeIndex !== -1 && activeIndex < value.length) {
                removeValue(value[activeIndex]);
                moveCurrent();
              } else if (target.selectionStart === 0) {
                if (selectedValue === inputValue || isValueSelected) {
                  removeValue(value[value.length - 1]);
                }
              }
            }
            break;

          case 'Escape':
            setActiveIndex(activeIndex === -1 ? value.length - 1 : -1);
            break;

          case 'Enter':
            if (inputValue.trim() !== '') {
              e.preventDefault();
              onValueChangeHandler(inputValue);
              setInputValue('');
            }
            break;
        }
      },
      [
        activeIndex,
        value,
        inputValue,
        removeValue,
        onValueChangeHandler,
        dir,
        isValueSelected,
        selectedValue,
      ]
    );

    return (
      <div
        {...props}
        ref={ref}
        dir={dir}
        className={cn(
          'flex items-center flex-wrap gap-1 rounded-md bg-background overflow-hidden border border-input ring-offset-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50',
          {
            'focus-within:ring-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2':
              activeIndex === -1,
          },
          className
        )}
      >
        {value.map((item, index) => (
          <Badge
            key={item}
            tabIndex={activeIndex !== -1 ? 0 : activeIndex}
            aria-disabled={disableButton}
            data-active={activeIndex === index}
            className={cn(
              "relative px-1 rounded flex items-center gap-1 data-[active='true']:ring-2 data-[active='true']:ring-muted-foreground truncate aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
            )}
            variant="secondary"
          >
            <span className="text-xs">{item}</span>
            <button
              type="button"
              aria-label={`Remove ${item} option`}
              disabled={disableButton}
              onClick={() => removeValue(item)}
              className="disabled:cursor-not-allowed"
            >
              <span className="sr-only">Remove {item} option</span>
              <RemoveIcon className="h-4 w-4 hover:stroke-destructive" />
            </button>
          </Badge>
        ))}
        <Input
          tabIndex={0}
          aria-label="input tag"
          disabled={disableInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={inputValue}
          onSelect={handleSelect}
          onChange={(e) =>
            activeIndex === -1 ? setInputValue(e.target.value) : undefined
          }
          placeholder={placeholder}
          onClick={() => setActiveIndex(-1)}
          className={cn(
            'outline-0 border-none h-7 min-w-fit flex-1 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 placeholder:text-muted-foreground px-1',
            activeIndex !== -1 && 'caret-transparent'
          )}
        />
      </div>
    );
  }
);

TagsInput.displayName = 'TagsInput';

export default TagsInput;
