/* ComboBox.css */
export const comboboxStyles = `
.combobox {
    position: relative;
    width: 100%;
  }
  
  .combobox-label {
    display: block;
    margin-bottom: 5px;
  }
  
  .combobox-input-container {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid var(--medium-grey, #A5B7BF);
    background: var(--white, #FFF);
  }

  .combobox-input-container:focus-within {
    border: 1px solid #0D9283;
  }
  
  .combobox-input {
    flex-grow: 1;
    border: none;
    margin-left: 10px;
  }
  
  .combobox-input:focus {
    outline: none;
  }
  
  .combobox-icon-dropdown {
    cursor: pointer;
  }
  
  .combobox-options-container {
    /* position: absolute; */
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background: white;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
  }
  
  .combobox-option {
    padding: 5px 0;
    cursor: pointer;
  }
  
  .combobox-option:hover {
    background-color: #f0f0f0;
  }
  
  .error-text {
    color: red;
    margin-top: 5px;
  }
  
  .combobox-option.highlighted {
    background-color: #eee;
  }
  `