export const tidysw5eSearchFilter = function (html, actor) {
  // filter settings list
  let searchInput = html.find(".filter-search input");

  searchInput.on("input", function () {
    filterInventoryList(this);
  });

  // check if already input
  (function () {
    searchInput.each(function () {
      if ($(this).val() != "") {
        filterInventoryList($(this));
      }
    });
  })();

  searchInput.on("blur", async function () {
    let id = $(this).attr("id"),
      value = $(this).val();
    switch (id) {
      case "item-search":
        await actor.setFlag("tidysw5e-sheet", "item-search", value);
        break;
      case "power-search":
        await actor.setFlag("tidysw5e-sheet", "power-search", value);
        break;
      case "feat-search":
        await actor.setFlag("tidysw5e-sheet", "feat-search", value);
        break;
    }
    // if(id == "item-search"){
    // } else {
    // }
  });

  async function filterInventoryList(input) {
    let searchField = $(input),
      clearSearch = searchField.siblings(".clear-search"),
      id = searchField.attr("id"),
      searchTarget,
      value = searchField.val();

    switch (id) {
      case "item-search":
        searchTarget = html.find(
          ".list-layout .inventory-list:not(.powerbook-list):not(.features-list) .item-name, .grid-layout .inventory-list:not(.powerbook-list):not(.features-list) .info-card-name"
        );
        break;
      case "power-search":
        searchTarget = html.find(
          ".list-layout .powerbook-list .item-name, .grid-layout .powerbook-list .info-card-name"
        );
        break;
      case "feat-search":
        searchTarget = html.find(".list-layout .features-list .item-name");
        break;
    }

    // if(id == "item-search"){
    //   searchTarget = html.find(".list-layout .inventory-list:not(.powerbook-list) .item-name, .grid-layout .inventory-list:not(.powerbook-list) .info-card-name");
    // } else {
    //   searchTarget = html.find(".list-layout .powerbook-list .item-name, .grid-layout .powerbook-list .info-card-name");
    // }

    if (value != "") {
      clearSearch.removeClass("hidden");
    } else {
      clearSearch.addClass("hidden");
    }

    value = value.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });

    searchTarget.each(function () {
      if ($(this).text().search(value) > -1) {
        $(this).closest(".item").removeClass("filtered").show();
      } else {
        $(this).closest(".item").addClass("filtered").hide();
      }

      if (
        $(this).closest(".item-list").find(".filtered").length + 1 ==
        $(this).closest(".item-list").children().length
      ) {
        $(this).closest(".item-list").hide();
        $(this).closest(".item-list").prev(".items-header").hide();
      } else {
        $(this).closest(".item-list").show();
        $(this).closest(".item-list").prev(".items-header").show();
      }
    });

    // clear search
    clearSearch.on("click", async function (e) {
      e.preventDefault();
      $(this).toggleClass("hidden");
      searchInput.val("");
      filterInventoryList(searchField);
      switch (id) {
        case "item-search":
          await actor.setFlag("tidysw5e-sheet", "item-search", "");
          break;
        case "power-search":
          await actor.setFlag("tidysw5e-sheet", "power-search", "");
          break;
        case "feat-search":
          await actor.setFlag("tidysw5e-sheet", "feat-search", "");
          break;
      }
      // if(id == "item-search"){
      //   await actor.setFlag('tidysw5e-sheet', 'item-search', '');
      // } else {
      //   await actor.setFlag('tidysw5e-sheet', 'power-search', '');
      // }
    });
  }
};
