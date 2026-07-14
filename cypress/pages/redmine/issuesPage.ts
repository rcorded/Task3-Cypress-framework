class IssuesPage {
  // --- GETTERS ДЛЯ OPTIONS ---
  get optionsLegend() { return cy.contains('legend', 'Options'); }
  get availableColumnsSelect() { return cy.get('#available_c'); }
  get selectedColumnsSelect() { return cy.get('#selected_c'); }
  get moveRightBtn() { return cy.get('input[value="→"]'); }
  get moveLeftBtn() { return cy.get('input[value="←"]'); }

  // --- GETTERS ДЛЯ FILTERS ---
  get filtersLegend() { return cy.contains('legend', 'Filters'); }
  get statusCheckbox() { return cy.get('#cb_status_id'); }
  get statusOperatorSelect() { return cy.get('#operators_status_id'); }
  get statusValueSelect() { return cy.get('#values_status_id_1'); }
  get clearBtn() { return cy.contains('.icon-reload', 'Clear'); }

  get applyBtn() { return cy.contains('.icon-checked', 'Apply'); }
  get tableHeaders() { return cy.get('table.issues thead th'); }
  get statusCells() { return cy.get('table.issues tbody td.status'); }
  get firstIssueSubject() { return cy.get('table.issues tbody tr').first().find('td.subject a'); }

  visit() {
    cy.visit(Cypress.env('issuesPage'));
    return this;
  }

  expandOptions() {
    cy.get('body').then(($body) => {
      if ($body.find('#available_c').is(':hidden')) {
        this.optionsLegend.click();
      }
    });
    this.availableColumnsSelect.should('be.visible');
  }

  setColumns(columnsToSelect: string[]) {
    this.selectedColumnsSelect.then(($select) => {
      const options = $select.find('option');
      if (options.length > 0) {
        const values = Cypress._.map(options, (opt) => (opt as HTMLOptionElement).value);
        this.selectedColumnsSelect.select(values);
        this.moveLeftBtn.click();
      }
    });
    columnsToSelect.forEach((columnName) => {
      this.availableColumnsSelect.select(columnName);
      this.moveRightBtn.click();
    });
  }

  getTableHeadersTexts() {
    return this.tableHeaders.then(($els) => {
      const texts = Cypress._.map($els, (el) => el.innerText.trim());
      return texts.filter((text) => text !== '');
    });
  }

  expandFilters() {
    cy.get('body').then(($body) => {
      if ($body.find('#cb_status_id').is(':hidden')) {
        this.filtersLegend.click();
      }
    });
    this.statusCheckbox.should('be.visible');
  }

  setStatusFilter(operator: string, value: string) {
    this.statusCheckbox.check();
    this.statusOperatorSelect.select(operator);
    this.statusValueSelect.select(value);
  }

  getVisibleStatuses() {
    return this.statusCells.then(($els) => {
      return Cypress._.map($els, (el) => el.innerText.trim());
    });
  }

  clickApply() {
    this.applyBtn.click();
  }

  clickClear() {
    this.clearBtn.click();
  }

  getFirstIssueTitle() {
    return this.firstIssueSubject.invoke('text').then((text) => {
      return text.trim();
    });
  }

}

export const issuesPage = new IssuesPage();     
