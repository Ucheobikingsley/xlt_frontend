<template>
  <div class="pages entry myads">
    <div class="main_">
      <div class="header">
        <div class="header_container">
          <p class="title">My Adverts</p>
        </div>
        <div class="nav_container">
          <p
            :class="{ activeActive: activeTab == 'active' }"
            class="active"
            @click="activeTab = 'active'"
          >
            <i class="far fa-check-circle"></i>Active <span>(0)</span>
          </p>
          <p
            :class="{ activeReview: activeTab == 'review' }"
            class="reviewing"
            @click="activeTab = 'review'"
          >
            <i class="fas fa-hourglass-start"></i>Reviewing
            <span>(0)</span>
          </p>
          <p
            :class="{ activeDeclined: activeTab == 'declined' }"
            class="declined"
            @click="activeTab = 'declined'"
          >
            <i class="fas fa-ban"></i>Declined <span>(0)</span>
          </p>
          <p
            :class="{ activeDraft: activeTab == 'draft' }"
            class="draft"
            @click="activeTab = 'draft'"
          >
            <i class="fas fa-save"></i>Draft <span>(0)</span>
          </p>
          <p
            :class="{ activeClosed: activeTab == 'closed' }"
            class="closed"
            @click="activeTab = 'closed'"
          >
            Closed <span>(0)</span>
          </p>
          <p
            :class="{ activeAll: activeTab == 'all' }"
            class="all"
            @click="activeTab = 'all'"
          >
            <i class="far fa-check-circle"></i>All <span>(0)</span>
          </p>
        </div>
        <div class="bottom_line"></div>
      </div>
      <div class="body">
        <DxDataGrid
          ref="tableRef"
          class="data-table"
          :show-borders="showBorders"
          :allow-column-resizing="true"
          :column-auto-width="true"
          :repaint-changes-only="true"
          :selected-row-keys="selectedRows"
          :height="tableHeight"
          :on-selection-changed="updateSelectedRows"
          :on-row-click="viewJob"
          :word-wrap-enabled="true"
          :data-source="allAds"
          :show-column-lines="showColumnLines"
          :show-row-lines="showRowLines"
          :remote-operations="false"
          :two-way-binding-enabled="false"
          @content-ready="configureDataGrid"
        >
          <DxGroupPanel :visible="true" />
          <DxSorting mode="multiple" />
          <DxColumnChooser :enabled="true" :allow-search="true" />
          <DxColumnFixing :enabled="true" />
          <DxFilterRow :visible="true" apply-filter="auto" />
          <DxHeaderFilter :visible="true" />
          <DxSearchPanel
            :visible="true"
            :width="240"
            placeholder="Search..."
          />
          <DxSelection
            select-all-mode="page"
            show-check-boxes-mode="always"
            mode="multiple"
          />

          <DxScrolling
            mode="standard"
            row-rendering-mode="virtual"
            :preload-enabled="true"
            column-rendering-mode="virtual"
          />

          <DxPaging :enabled="false" />

          <DxColumn type="selection" />
          <DxColumn data-field="category" caption="Categories" />
          <DxColumn
            data-field="item"
            caption="Item Name"
            alignment="left"
          />
          <DxColumn data-field="request" caption="No of Request" />
          <DxColumn
            data-field="closing_date"
            caption="Closing Date"
            data-type="date"
            format="dd/MM/yyyy"
          />
          <DxColumn
            data-field="date_created"
            caption="Date Created"
            data-type="date"
            format="dd/MM/yyyy"
          />
          <DxColumn
            data-field="status"
            caption="Status"
            cell-template="statusTemplate"
            alignment="center"
          />
          <template #statusTemplate="{ data }">
            <span class="column--status--wrapper" :class="data.value">
              <span class="status">
                {{ getJobStatusText(data.value) }}
              </span>
            </span>
          </template>
        </DxDataGrid>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxColumnFixing,
  DxScrolling,
  DxSorting,
  DxGroupPanel,
  DxFilterRow,
  DxHeaderFilter,
  DxSearchPanel,
  DxSelection,
  DxPaging,
} from 'devextreme-vue/data-grid';
import {
  capitalize,
  // cloneDeep,
  // debounce,
  // get,
  // isArray,
  isString,
  // pick,
  // set,
} from 'lodash-es';
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxColumnFixing,
    DxScrolling,
    DxSorting,
    DxGroupPanel,
    DxFilterRow,
    DxHeaderFilter,
    DxSearchPanel,
    DxSelection,
    DxPaging,
  },
  setup() {
    const allAds = ref([
      {
        id: 1,
        category: 'Farming and Machinery',
        item: 'Almond Seed',
        request: '8',
        closing_date: '12/01/2024',
        date_created: '08/02/2022',
        status: 'open',
      },

      {
        id: 2,
        category: 'Farming and Machinery',
        item: 'Almond Seed',
        request: '8',
        closing_date: '12/01/2024',
        date_created: '08/02/2022',
        status: 'open',
      },

      {
        id: 3,
        category: 'Farming and Machinery',
        item: 'Almond Seed',
        request: '8',
        closing_date: '12/01/2024',
        date_created: '08/02/2022',
        status: 'closed',
      },

      {
        id: 4,
        category: 'Farming and Machinery',
        item: 'Almond Seed',
        request: '8',
        closing_date: '12/01/2024',
        date_created: '08/02/2022',
        status: 'on-hold',
      },
    ]);

    const getJobStatusText = (text) => {
      return isString(text)
        ? String(text)
            .split(' ')
            .map((text) => capitalize(text))
            .join('-')
        : '';
    };
    const activeTab = ref();
    return {
      activeTab,
      showColumnLines: false,
      showBorders: false,
      showRowLines: false,
      allAds,
      getJobStatusText,
    };
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
.pages.entry.myads {
  :deep() {
    width: 100%;
    background: color.$white-2;

    .main_ {
      width: 96%;
      min-height: 400px;
      background: color.$white-1;
      border-radius: 6px;
      margin-top: 30px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

      .header {
        display: flex;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid rgba(color.$grey-shade, 0.2);

        .header_container {
          width: 20%;
          padding-left: 30px;
          .title {
            font-size: 20px;
            font-weight: 900;
          }
        }
        .nav_container {
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 80px;

          > * {
            margin-right: 14px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            &:is(:first-child) {
              color: color.$greenColor;
            }
          }

          .activeActive {
            background: color.$green-1;
            border-radius: 6px;
            padding: 13px;
            color: color.$white-1;
          }
          .activeReview {
            background: color.$warning-1;
            border-radius: 6px;
            padding: 13px;
            color: color.$white-1 !important;
          }
          .activeDeclined {
            background: color.$red-1;
            border-radius: 6px;
            padding: 13px;
            color: color.$white-1 !important;
          }
          .activeDraft {
            background: color.$black-2;
            border-radius: 6px;
            padding: 13px;
            color: color.$white-1 !important;
          }
          .activeClosed {
            background: color.$grey-shade;
            border-radius: 6px;
            padding: 13px;
            color: color.$white-1 !important;
          }
          .activeAll {
            background: color.$grey-shade;
            border-radius: 6px;
            padding: 13px;
            color: color.$white-1 !important;
          }
          .reviewing {
            color: color.$warning;
          }
          .declined {
            color: color.$red-faint;
          }
          .closed,
          .all {
            color: color.$grey-shade;
          }
        }
      }
      .body {
        > .data-table {
          padding: {
            top: 18px;
            right: 0;
            left: 0;
          }

          > .dx-datagrid {
            > .dx-datagrid-header-panel {
              padding: {
                left: 15px;
                right: 15px;
              }
            }

            > .dx-datagrid-headers {
              > .dx-datagrid-content {
                > .dx-datagrid-table {
                  > tbody {
                    > .dx-header-row {
                      > td {
                        &:not(.dx-command-select) {
                          text-align: left !important;
                        }

                        > .dx-column-indicators {
                          float: initial !important;
                          margin: 0 10px 0 0;

                          &.dx-visibility-hidden {
                            display: none;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            > .dx-datagrid-rowsview {
              > .dx-scrollable-wrapper {
                > .dx-scrollable-container {
                  > .dx-scrollable-content {
                    > .dx-datagrid-content {
                      > .dx-datagrid-table {
                        > tbody {
                          > .dx-row {
                            > td {
                              padding-right: 10px;
                              padding-left: 10px;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          .column--status--wrapper {
            display: inline-flex;
            padding: 6px 15px;
            justify-content: center;
            align-items: center;
            background-color: rgba(color.$black-1, 0.3);
            border-radius: 7px;
            transition: all 0.3s ease-in-out;

            > .status {
              display: inline-flex;
              align-items: center;
              color: color.$black-1;

              &::before {
                content: '';
                display: inline-flex;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: color.$black-1;
                transition: all 0.3s ease-in-out;
                margin: 0 15px 0 0;
              }
            }

            &.closed {
              background-color: rgba(color.$red-1, 0.3);

              > .status {
                color: color.$red-1;

                &::before {
                  background-color: color.$red-1;
                }
              }
            }

            &.filled {
              background-color: rgba(color.$blue-1, 0.3);

              > .status {
                color: color.$blue-1;

                &::before {
                  background-color: color.$blue-1;
                }
              }
            }

            &.open {
              background-color: rgba(color.$green-1, 0.3);

              > .status {
                color: color.$green-1;

                &::before {
                  background-color: color.$green-1;
                }
              }
            }

            &.on-hold {
              background-color: rgba(color.$yellow-1, 0.3);

              > .status {
                color: color.$yellow-1;

                &::before {
                  background-color: color.$yellow-1;
                }
              }
            }
          }

          .dx-datagrid-content .dx-datagrid-table .dx-row > td,
          .dx-datagrid-content .dx-datagrid-table .dx-row > tr > td {
            vertical-align: middle;
          }

          .dx-datagrid .dx-column-lines > td {
            border: none;
          }

          .dx-row.dx-data-row {
            cursor: pointer;

            &:hover {
              background-color: sasscolor.adjust(
                color.$white-1,
                $lightness: -3%
              );
            }
          }

          .dx-datagrid-rowsview
            .dx-selection.dx-row:not(.dx-row-focused)
            > td,
          .dx-datagrid-rowsview
            .dx-selection.dx-row:not(.dx-row-focused)
            > tr
            > td,
          .dx-datagrid-rowsview
            .dx-selection.dx-row:not(.dx-row-focused):hover
            > td,
          .dx-datagrid-rowsview
            .dx-selection.dx-row:not(.dx-row-focused):hover
            > tr
            > td {
            background-color: initial;
            color: initial;
          }
        }
      }
    }
  }
}
</style>
