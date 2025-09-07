import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import apiClient from "../api";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Editor = ({ value, setValue }) => {
  const [selectedTab, setSelectedTab] = React.useState("write");

  return (
    <div className="w-full rounded-lg border border-gray-300 shadow-md">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        toolbarCommands={[
          ["bold", "italic", "strikethrough", "link"],
          ["quote", "code", "unordered-list", "ordered-list", "checked-list"],
        ]}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        paste={{
          saveImage: async function* (data) {
            let file;

            if (data instanceof File) {
              file = data;
            } else if (data instanceof ArrayBuffer) {
              file = new File([data], "pasted-image.png", {
                type: "image/png",
              });
            } else {
              console.error("Unknown paste data type:", data);
              return;
            }

            const formData = new FormData();
            formData.append("image", file);

            const res = await apiClient.post("/upload", formData);

            yield res.data.data.imageUrl;
          },
        }}
      />
    </div>
  );
};

export default Editor;
