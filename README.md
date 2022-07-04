# **@nthity/validation**

> @nthity/validation is a easy to use validation for react components.

## WIKI

Please check our [wiki](https://github.com/agentg2007/validation-context/wiki) for more complete documentation.

## Usage

### Creating input components

```typescript
import {} from "react";
import {
  InputComponentType,
  useComponentValidationState,
  withValidation,
} from "@nthity/validation";

const Input = withValidation<InputComponentType<string>>((props) => {
  const { className = "", componentId, value, onChange } = props;
  const { valid, messages } = useComponentValidationState(componentId);
  return (
    <div className={`${className} ${valid ? "" : "error"}`}>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}, "InputDisplayName");
```

### Using validation provider

```typescript
import ValidationContextProvider, {
  useValidationResult,
  Validators,
} from "@nthity/validation";

const App = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ValidationContextProvider validators={Validators}>
        <main style={{ border: "1px solid black", padding: 16 }}>
          <Input
            value={value}
            onChange={(value) => setValue(value)}
            validators={[
              {
                name: "RequiredFieldValidator",
              },
              {
                name: "EmailFieldValidator",
              },
              {
                name: "StringLengthFieldValidator",
                min: 7,
                max: 32,
              },
            ]}
          />
        </main>
        <ButtonPanel />
      </ValidationContextProvider>
    </div>
  );
};

const ButtonPanel = () => {
  const { valid = false, messages } = useValidationResult();
  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
      <button style={{ padding: 8 }} disabled={!valid}>
        Submit
      </button>
      {!valid && (
        <ul className="error-messages">
          {messages.map((m, index) => (
            <li
              key={`ValidationMessage#${index}`}
              children={<span>{m.message}</span>}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
```

# Change Log:

You can also access our [change log](https://github.com/agentg2007/validation-context/blob/main/CHANGELOG.md).
