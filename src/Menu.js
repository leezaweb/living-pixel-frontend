import React, { Component } from "react";
import { Menubar } from "primereact/components/menubar/Menubar";

class Menu extends Component {
  render() {
    var items = [
      {
        label: "Edit",
        icon: "fa-edit",
        items: [
          {
            label: "New",
            icon: "fa-plus",
            items: [{ label: "Project" }, { label: "Other" }]
          },
          { label: "Open" },
          { separator: true },
          { label: "Quit" },
          { label: "Undo", icon: "fa-mail-forward" },
          { label: "Redo", icon: "fa-mail-reply" }
        ]
      },
      {
        label: "Help",
        icon: "fa-question",
        items: [
          {
            label: "Contents"
          },
          {
            label: "Search",
            icon: "fa-search",
            items: [
              {
                label: "Text",
                items: [
                  {
                    label: "Workspace"
                  }
                ]
              },
              {
                label: "File"
              }
            ]
          }
        ]
      },
      {
        label: "Account",
        icon: "fa-gear",
        items: [
          {
            label: "Edit",
            icon: "fa-refresh",
            items: [
              { label: "Save", icon: "fa-save" },
              { label: "Update", icon: "fa-save" }
            ]
          },
          {
            label: "Other",
            icon: "fa-phone",
            items: [{ label: "Delete", icon: "fa-minus" }]
          },
          {
            label: "Quit",
            icon: "fa-minus"
          }
        ]
      }
    ];

    return <Menubar Menubar model={items} />;
  }
}

export default Menu;
