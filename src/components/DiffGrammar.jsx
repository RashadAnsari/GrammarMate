/* eslint-disable react/no-array-index-key */
import React from 'react';
import { diffChars } from 'diff';
import { theme } from 'antd';

const { useToken } = theme;

const DiffGrammar = ({ from, to }) => {
  const { token } = useToken();

  const switchDiffProps = (part, key = 0) => {
    const added = part[0] === 1 || part.added;
    const removed = part[0] === -1 || part.removed;
    const value = part[1] || part.value;

    let color = token.colorTextSecondary;
    if (added) {
      color = token.colorSuccess;
    } else if (removed) {
      color = token.colorError;
    }

    return {
      key,
      value,
      style: {
        color,
        fontSize: 18,
        lineHeight: 1.75,
        display: 'inline',
      },
    };
  };

  const printPart = (part) => (
    <span key={part.key} style={part.style}>
      {part.value.split('\n').map((line, key) => (
        <span key={key}>
          {key !== 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </span>
  );

  const printDiff = () => {
    const diff = diffChars(from, to);

    return (
      <span>
        {diff.map(switchDiffProps).map(printPart)}
      </span>
    );
  };

  return printDiff();
};

export default DiffGrammar;
