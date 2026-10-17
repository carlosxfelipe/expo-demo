/**
 * Centralized registry of testIDs for Maestro and AndroFlow automated E2E testing.
 *
 * Naming convention:
 * - tab_*         -> Navigation tabs / bottom bar buttons
 * - screen_*      -> Screen root views or major containers
 * - scroll_*      -> Scrollable containers (ScrollView, FlatList)
 * - btn_*         -> Buttons and clickable items
 * - txt_*         -> Text labels, titles and headers
 * - input_*       -> Text inputs and form fields
 * - container_*   -> Structural cards, wrappers or sections
 * - hint_*        -> Informational hints / tutorial rows
 * - collapsible_* -> Expandable accordions / collapsible headers & content
 */
export const TestIDs = {
  // Navigation & Tabs
  tabs: {
    home: "tab_home",
    explore: "tab_explore",
    docs: "btn_web_docs",
  },

  // Home Screen
  home: {
    screen: "screen_home",
    scroll: "scroll_home",
    welcome: "txt_welcome_title",
    getStarted: "txt_get_started",
    containerSteps: "container_steps",
    hintEditing: "hint_editing",
    hintDevtools: "hint_devtools",
    hintFreshStart: "hint_fresh_start",
    // AndroFlow Playground / Interactive Section
    playgroundCard: "playground_card",
    playgroundTitle: "txt_playground_title",
    inputUserName: "input_user_name",
    previewText: "txt_preview",
    counterValue: "txt_counter_value",
    btnDecrement: "btn_decrement",
    btnIncrement: "btn_increment",
    btnResetCounter: "btn_reset_counter",
  },

  // Explore Screen
  explore: {
    screen: "screen_explore",
    scroll: "scroll_explore",
    title: "txt_explore_title",
    btnDocs: "btn_expo_docs",
    // Collapsibles / Accordions
    collapsibleRouting: "collapsible_file_based_routing",
    collapsiblePlatforms: "collapsible_android_ios_and_web_support",
    collapsibleImages: "collapsible_images",
    collapsibleThemes: "collapsible_light_and_dark_mode_components",
    collapsibleAnimations: "collapsible_animations",
  },

  // Common & UI Elements
  common: {
    webBadge: "badge_web",
  },
} as const;

/**
 * Helper to produce standard testID and accessibility props.
 */
export function testProps(id: string, accessibilityLabel?: string) {
  return {
    testID: id,
    accessibilityLabel: accessibilityLabel ?? id,
    accessible: true,
  };
}

/**
 * Helper specifically for Views to prevent Android view flattening.
 * Setting collapsable: false prevents Android from optimizing out/flattening views.
 */
export function viewTestProps(id: string, accessibilityLabel?: string) {
  return {
    testID: id,
    accessibilityLabel: accessibilityLabel ?? id,
    accessible: true,
    collapsable: false,
  };
}
