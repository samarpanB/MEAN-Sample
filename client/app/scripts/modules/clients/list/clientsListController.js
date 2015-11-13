define(['app', 'angular', 'bootbox', 'underscore'], 
  function (app, angular, bootbox) {
  'use strict';

    app.controller('ClientsListCtrl', ['$scope', '$q', 'constants', '$compile', 'globals', 'dateFilter',
        'DTOptionsBuilder', 'DTColumnBuilder', '$state', '$timeout', 'clientsModel',
        function ($scope, $q, constants, $compile, globals, dateFilter,
            DTOptionsBuilder, DTColumnBuilder, $state, $timeout, clientsModel) {

            var _watcherRemovers = [];
            
            $scope.isLoading = false;
            $scope.pgSizes = ["5", "10", "15", "20", "25"];
            $scope.pgSize = $scope.pgSizes[0];
            $scope.searchText = "";
            $scope.clients = clientsModel.get();

            $scope.getAll = function(max, offset, searchText) {
                var params = {
                    max: max,
                    offset: offset,
                    searchText: searchText 
                };

                return $scope.clients.fetch(true, params);
            };

            $scope.open = function(index) {
                var client = $scope.clients.data.records[index];
                $state.go('^.save', {id: client._id});
            };
            
            $scope.delete = function(index) {
                var client = $scope.clients.data.records[index];
                if(client) {
                    bootbox.confirm({
                        message: 'Are you sure you want to remove this client ?',
                        title: 'Warning',
                        callback: function(c){
                            if(c)
                            {
                                $scope.isLoading = true;
                                $scope.clients.delete(client).then(function(){
                                    $scope.isLoading = false;
                                    $scope.dtInstance.reloadData();
                                }, function(){
                                    $scope.isLoading = false;
                                    $scope.dtInstance.reloadData();
                                });
                            }
                        }
                    });
                }
            };

            $scope.deleteSelected = function(selected, selectedCount) {
                bootbox.confirm({
                    message: 'Are you sure you want to remove these ' + selectedCount + ' client'+ 
                        (selectedCount > 1 ? 's' : '') +' ?',
                    title: 'Warning',
                    callback: function(c){
                        if(c)
                        {
                            $scope.isLoading = true;
                            var callsQ = [], client;
                            angular.forEach(selected, function(v, k){
                                if(v) {
                                    client = $scope.clients.data.records[k];
                                    callsQ.push($scope.clients.delete(client));
                                }
                            });
                            $q.all(callsQ).then(function(){
                                $scope.isLoading = false;
                                $scope.dtInstance.reloadData();
                            }, function(){
                                $scope.isLoading = false;
                                $scope.dtInstance.reloadData();
                            });
                        }
                    }
                });
            };

            /**** Table related code - START ****/

            $scope.selectAll = false;
            $scope.selected = {};
            $scope.selectedCount = 0;

            $scope.refreshTable = function(newPgSize) {
                $scope.dtInstance.DataTable.page.len(newPgSize || $scope.pgSize);
                $scope.dtInstance.reloadData(null, true);
            };

            function createdRow(row) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            }

            function actionsHtml(data, type, full, meta) {
                return '<div class="dataTableListActions">'+
                    '<a href="javascript:void(0)" class="muted" ng-click="open(\''+meta.row+'\')">'+
                        '<i class="fa fa-edit"></i>'+
                    '</a>'+
                    '<a href="" class="muted" ng-click="delete('+meta.row+')">'+
                        '<i class="fa fa-trash"></i>'+
                    '</a>'+
                '</div>';
            }

            function statusHtml(data, type, full, meta){
                return '<div class="btn-group" data-toggle="buttons" '+
                    'ng-click="clients.updateStatus(\''+meta.row+'\')">'+
                    '<label class="btn btn-default'+ (data ? ' active' : '') +'">'+
                        '<input type="radio" value="true" name="status">'+'<i class="fa fa-active"></i>'+ 'On'+
                    '</label>'+
                    '<label class="btn btn-default'+ (!data ? ' active' : '') +'">'+
                        '<input type="radio" value="false" name="status">'+'<i class="fa fa-inactive"></i>'+ 'Off'+
                    '</label>'+
                '</div>';
            }

            var titleHtml = '<input type="checkbox" ng-model="selectAll" '+
                'ng-click="toggleAll(selectAll, selected)">';

            $scope.dtOptions =DTOptionsBuilder.newOptions()
            .withOption('ajax', function (data, callback) {
                $scope.selectAll = false;
                $scope.getAll(data.length, data.start, $scope.searchText).then(function(r){
                    callback({
                        draw: data.draw,
                        recordsTotal: r.totalRecords,
                        recordsFiltered: r.totalRecords,
                        data: r.records
                    });
                }, function(){
                    callback({
                        draw: data.draw,
                        recordsTotal: 0,
                        recordsFiltered: 0,
                        data: [],
                        error: 'Unknown error occured !'
                    });
                });
            })
            .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withDisplayLength($scope.pgSize)
            .withDOM("t<'row-fluid datatables_footer'<'span12'pi>>r")
            .withLanguage({ 
                "sEmptyTable": "No records found !", 
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Clients", 
                "sInfoEmpty": "", 
                "sInfoFiltered": "(filtered from _MAX_ total Clients)", 
                "sInfoPostFix": "", 
                "sInfoThousands": ",", 
                "sLoadingRecords": "Loading...", 
                "sProcessing": '<div class="outer"><div class="middle"><div class="inner"><img src="assets/img/throbber.svg" width="16" height="16" alt=""/></div></div></div>', 
                "sSearch": "Search:", 
                "sZeroRecords": "No matching records found", 
                "oPaginate": { 
                    "sFirst": "First", 
                    "sLast": "Last", 
                    "sNext": ">", 
                    "sPrevious": "<" 
                }, 
            })
            .withOption('createdRow', createdRow)
            .withOption('headerCallback', function(header) {
                if (!$scope.headerCompiled) {
                    // Use this headerCompiled field to only compile header once
                    $scope.headerCompiled = true;
                    $compile(angular.element(header).contents())($scope);
                }
            })
            .withBootstrap()
            .withBootstrapOptions({
                pagination: {
                    classes: {
                        ul: 'pagination'
                    }
                }
            });
            $scope.dtColumns = [ 
                DTColumnBuilder.newColumn(null).withTitle(titleHtml)
                    .renderWith(function(data, type, full, meta) {
                        $scope.selected[meta.row] = false;
                        return '<input type="checkbox" ng-model="selected[' + meta.row + ']" '+
                            'ng-click="toggleOne(selected)">';
                    }).notSortable(),
                DTColumnBuilder.newColumn('firstName').withTitle('Name').renderWith(function(data, type, full){
                    return full.clientType + " " + full.firstName + " " + full.lastName;
                }).notSortable(),
                DTColumnBuilder.newColumn('mobile').withTitle('Mobile Number').withOption("defaultContent", "").notSortable(),
                DTColumnBuilder.newColumn('email').withTitle('Email').withOption("defaultContent", "").notSortable(),
                DTColumnBuilder.newColumn('user.active').withTitle('Active').notSortable().renderWith(statusHtml),
                DTColumnBuilder.newColumn(null).notSortable().renderWith(actionsHtml)
            ];
            $scope.dtInstance = {};

            $scope.toggleAll = function(selectAll, selectedItems) {
                for (var id in selectedItems) {
                    selectedItems[id] = selectAll;
                }
            };

            $scope.toggleOne = function(selectedItems) {
                for (var id in selectedItems) {
                    if(!selectedItems[id]) {
                        $scope.selectAll = false;
                        return;
                    }
                }
                $scope.selectAll = true;
            };

            _watcherRemovers.push($scope.$watch('selected', function(n, o){
                if(n !== o) {
                    $scope.selectedCount = 0;
                    angular.forEach(n, function(val){
                        if(val) {
                            $scope.selectedCount++;
                        }
                    });
                }
            }, true));

            /**** Table related code - END ****/

            // Destroy handler
            $scope.$on('$destroy', function(){
                angular.forEach(_watcherRemovers, function(val){
                    val();
                });
            });
        }
    ]);
});
