import React from 'react';

const InputBox = React.forwardRef((props, ref) => (
    <div id="input-box">
        <textarea ref={ref} id="editor" onChange={props.onChange} value={props.value} onKeyDown={props.onKeyDown} />
    </div>
  ));

export default InputBox;
