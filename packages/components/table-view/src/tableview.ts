/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Template } from "@fluid-example/flow-util-lib";
import { TableDocument, TableDocumentType } from "@fluid-example/table-document";
import { IComponentContext, IComponentRuntime } from "@microsoft/fluid-runtime-definitions";
import { PrimedComponent, PrimedComponentFactory } from "@prague/aqueduct";
import { IComponentHTMLOptions, IComponentHTMLVisual } from "@prague/component-core-interfaces";
import { GridView } from "./grid";
import * as styles from "./index.css";

const template = new Template({
    tag: "div",
    children: [
        { tag: "button", ref: "addRow", props: { textContent: "R+" } },
        { tag: "button", ref: "addCol", props: { textContent: "C+" } },
        { tag: "button", ref: "addRows", props: { textContent: "R++" } },
        { tag: "button", ref: "addCols", props: { textContent: "C++" } },
        { tag: "div", ref: "grid", props: { className: styles.grid } },
        { tag: "input", ref: "goto" },
    ],
});

export class TableView extends PrimedComponent implements IComponentHTMLVisual {
    public static getFactory() { return TableView.factory; }

    private static readonly factory = new PrimedComponentFactory(
        TableView,
        [],
    );

    public get IComponentHTMLVisual() { return this; }

    constructor(runtime: IComponentRuntime, context: IComponentContext) {
        super(runtime, context);
    }

    // #region IComponentHTMLVisual
    public render(elm: HTMLElement, options?: IComponentHTMLOptions): void {
        const root = template.clone();
        elm.append(root);

        this.getComponent<TableDocument>(this.docId, /* wait: */ true).then((doc) => {
            const grid = template.get(root, "grid");
            const gridView = new GridView(doc);
            grid.appendChild(gridView.root);

            const addRowBtn = template.get(root, "addRow");
            addRowBtn.addEventListener("click", () => {
                doc.insertRows(doc.numRows, 1);
            });

            const addRowsBtn = template.get(root, "addRows");
            addRowsBtn.addEventListener("click", () => {
                doc.insertRows(doc.numRows, 10 /* 1048576 */);
            });

            const addColBtn = template.get(root, "addCol");
            addColBtn.addEventListener("click", () => {
                doc.insertCols(doc.numCols, 1);
            });

            const addColsBtn = template.get(root, "addCols");
            addColsBtn.addEventListener("click", () => {
                doc.insertCols(doc.numCols, 10 /*16384*/);
            });

            const gotoInput = template.get(root, "goto") as HTMLInputElement;
            gotoInput.addEventListener("change", () => {
                gridView.startRow = parseInt(gotoInput.value, 10) - 1;
            });
        });
    }
    // #endregion IComponentHTMLVisual

    protected async componentInitializingFirstTime() {
        await this.createAndAttachComponent(this.docId, TableDocumentType);
    }

    private get docId() { return `${this.id}-doc`; }
}