# **@nthity/validation**

> @nthity/validation is a easy to use validation for react components.

## WIKI

Please check our [wiki](https://github.com/agentg2007/validation-context/wiki) for more complete documentation.

## Usage

### Creating input components

```typescript
import { InputComponentType, withValidation } from "@nthity/validation";

const Input = withValidation<InputComponentType<string>>((props) => {
  const { className = "", componentId, value, onChange } = props;
  const { valid, css, messages } = useValidationState(componentId);
  return (
    <div className={className}>
      <div className={valid ? "" : css}>
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
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

---

## Predefined Validators

| Name                                | Description                                                                                                                            |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **RequiredFieldValidator**          | This validator is used to make an input control required.                                                                              |
| **NumberInputFieldValidator**       | This validator is used to ensure input value is number.                                                                                |
| **NumberRangeFieldValidator**       | This validator evaluates the value of an input control to check that the value lies between specified ranges.                          |
| **DateTimeRangeFieldValidator**     | This validator evaluates the value of an input control to check that the date value lies between specified ranges.                     |
| **EmailFieldValidator**             | This validator evaluates the value of input control value is a valid email address.                                                    |
| **UrlFieldValidator**               | This validator evaluates the value of input control value is a valid url address.                                                      |
| **StringLengthFieldValidator**      | This validator evaluates the value of an input control to check that the string value length lies between specified ranges.            |
| **SelectedItemCountFieldValidator** | This validator evaluates the value of an input control to check that the number of selected items count lies between specified ranges. |

---

