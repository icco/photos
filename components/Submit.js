import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import { getToken } from "../lib/auth.js";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

const baseUrl = process.env.GRAPHQL_ORIGIN.substring(
  0,
  process.env.GRAPHQL_ORIGIN.lastIndexOf("/")
);

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      files: [],
    };
  }

  handleChange = event => {
    const files = Array.from(
      event.target.getElementsByTagName("input")[0].files
    );
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append("file", file);
    });

    fetch(`${baseUrl}/photo/new`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(res => res.json())
      .then(j => {
        console.log(j);
        this.setState({
          files: [j.file],
          upload: j.upload,
          uploading: false,
        });
      });
  };

  render() {
    let file = <></>;

    if (this.state.files.length > 0) {
      const fileUrl =
        this.state.files[0].replace(
          "storage.googleapis.com/icco-cloud",
          "icco.imgix.net"
        ) + "?auto=format%2Ccompress";
      file = (
        <>
          <div className="mv4">
            Last uploaded file: <a href={fileUrl}>{fileUrl}</a>
          </div>
          <img className="mw-100" src={fileUrl} />
        </>
      );
    }
    return (
      <div className="pa4 black-80">
        <form
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            this.handleChange(e);
          }}
          encType="multipart/form-data"
        >
          <div className="measure mv2">
            <label htmlFor="photo" className="f6 b db mb2">
              Photo
            </label>
            <input
              id="photo"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="file"
              accept="image/*"
              aria-describedby="photo-desc"
            />
            <small id="photo-desc" className="f6 black-60 db mb2">
              Photo uploaded
            </small>
          </div>

          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Submit"
          />
        </form>
        {file}
      </div>
    );
  }
}

export default withRouter(Submit);
