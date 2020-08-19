export declare class CalciteTile {
    /** The active state of the tile. */
    active?: boolean;
    /** The description text that appears beneath the heading of the tile. */
    description?: string;
    /** The embed mode of the tile.  When true, renders without a border and padding for use by other components. */
    embed: boolean;
    /** The focused state of the tile. */
    focused: boolean;
    /** The heading text that appears between the icon and description of the tile. */
    heading?: string;
    /** The hidden state of the tile. */
    hidden: boolean;
    /** The (optional) url for the tile. (Only applies when embed is set to false) */
    href?: string;
    /** The icon that appears at the top of the tile. */
    icon?: string;
    /** The theme of the tile. */
    theme: "light" | "dark";
    renderTile(): any;
    render(): any;
}
