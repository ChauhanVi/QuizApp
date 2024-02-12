import React from 'react';
import './styles.css';

const Options = ({ options, onSelectOption, selectedOptionIndex }) => {
  const handleOptionClick = (index) => {
    onSelectOption(index);
  };

  return (
    <div className="options">
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(index)}
            className={selectedOptionIndex === index ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Options;
