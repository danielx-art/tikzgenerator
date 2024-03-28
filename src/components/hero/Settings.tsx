import { useState } from "react";
import DialogBox from "../micro/DialogBox";
import useStore from "import/utils/store/useStore";
import configStore, { ConfigState } from "import/utils/store/configStore";
import Switcher from "../micro/Switcher";
import { STROKE_STYLE_OPTIONS } from "../custom/general/stroke/StrokeStyleChanger";
import {
  FILL_STYLES,
  LATEX_COLOR,
  LATEX_COLORS,
  STROKE_STYLES,
} from "public/generalConfigs";

const Settings = () => {
  const configs = useStore(configStore, (state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);

  if (!configs) return;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{icon}</button>
      <DialogBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Configurações"
        closeButton
        className="h-3/4 w-fit min-w-[50%] max-w-[80%]"
      >
        {isAdvanced ? (
          <div className="mt-4 flex w-full min-w-fit flex-1 flex-col divide-y-8">
            {Object.keys(configs)
              .toSpliced(0, 1)
              .toSpliced(-1, 1)
              .map((each) => {
                const value = configs[each as keyof ConfigState];

                let content = <></>;

                switch (each) {
                  case "DEFAULT_POINT_STYLE": {
                    content = (
                      <select
                        value={value}
                        onChange={(e) =>
                          configs.setConfig(each, parseInt(e.target.value))
                        }
                        className=" w-28"
                      >
                        {[0, 1, 2].map((option) => (
                          <option
                            value={option}
                            key={`configs_${each}_${option}`}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    );

                    return (
                      <GeneralItem name={each} key={`configs_${each}`}>
                        {content}
                      </GeneralItem>
                    );
                  }
                  case "DEFAULT_STROKE_STYLE": {
                    content = (
                      <select
                        value={value}
                        onChange={(e) =>
                          configs.setConfig(
                            each,
                            e.target.value as STROKE_STYLES,
                          )
                        }
                        className=" w-28"
                      >
                        {STROKE_STYLE_OPTIONS.map((option) => (
                          <option
                            value={option}
                            key={`configs_${each}_${option}`}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    );

                    return (
                      <GeneralItem name={each} key={`configs_${each}`}>
                        {content}
                      </GeneralItem>
                    );
                  }
                  case "DEFAULT_FILL_STYLE": {
                    const FILL_STYLES = [
                      "solid",
                      "dotted",
                      "hachure-0",
                      "hachure-1",
                      "hachure-2",
                      "hachure-3",
                    ];
                    content = (
                      <select
                        value={value}
                        onChange={(e) =>
                          configs.setConfig(each, e.target.value as FILL_STYLES)
                        }
                        className=" w-28"
                      >
                        {FILL_STYLES.map((option) => (
                          <option
                            value={option}
                            key={`configs_${each}_${option}`}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    );
                    return (
                      <GeneralItem name={each} key={`configs_${each}`}>
                        {content}
                      </GeneralItem>
                    );
                  }
                  case "DEFAULT_ANGLE_STYLE": {
                    content = (
                      <select
                        value={value}
                        onChange={(e) =>
                          configs.setConfig(each, parseInt(e.target.value))
                        }
                        className=" w-28"
                      >
                        {[0, 1].map((option) => (
                          <option
                            value={option}
                            key={`configs_${each}_${option}`}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    );

                    return (
                      <GeneralItem name={each} key={`configs_${each}`}>
                        {content}
                      </GeneralItem>
                    );
                  }
                  case "DEFAULT_ANGLE_MARKS": {
                    return null;
                  }
                  case "DEFAULT_SEGMENT_MARKS": {
                    return null;
                  }
                  default: {
                    content =
                      typeof value === "number" ? (
                        <input
                          type="number"
                          className="w-16 justify-end text-right"
                          value={value}
                          onChange={(e) =>
                            configs.setConfig(
                              each as keyof ConfigState,
                              parseFloat(e.target.value),
                            )
                          }
                        />
                      ) : each.endsWith("COLOR") ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            configs.setConfig(
                              each as keyof ConfigState,
                              e.target.value as LATEX_COLOR,
                            )
                          }
                          className=" w-28"
                        >
                          {LATEX_COLORS.map((option, id) => (
                            <option
                              value={option}
                              key={`configs_color_${each}_${id}`}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="w-fit justify-end text-right"
                          value={value}
                          onChange={(e) =>
                            configs.setConfig(
                              each as keyof ConfigState,
                              e.target.value,
                            )
                          }
                        />
                      );
                    return (
                      <GeneralItem name={each} key={`configs_${each}`}>
                        {content}
                      </GeneralItem>
                    );
                  }
                }

                return <></>;
              })}
          </div>
        ) : (
          <div className="flex w-full flex-1 flex-col gap-2">
            <div className="text-md p-6 italic text-c_scnd2 text-opacity-60">
              Em construção, tente alternar para as configurações <br />
              avançadas abaixo:
            </div>
          </div>
        )}
        <div className="my-6 flex w-full place-content-end">
          <Switcher
            isChecked={isAdvanced}
            setIsChecked={setIsAdvanced}
            messageOne="Avançadas"
          />
        </div>
      </DialogBox>
    </>
  );
};

export default Settings;

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-6 w-6 transition-all duration-75 hover:-translate-y-0.5 hover:text-c_interact"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const GeneralItem: React.FC<{
  name: string;
  children: React.ReactNode;
  key: string;
}> = ({ name, children }) => {
  return (
    <div
      //key={key}
      className="flex w-full min-w-fit flex-row flex-nowrap justify-between gap-2"
    >
      <div>{name}</div>
      <div>{children}</div>
    </div>
  );
};
