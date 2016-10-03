<template>
    <form class="form-inline text-right">
        <button class="btn btn-default" v-show="searchMode" @click="dataReload">返回預設搜尋</button>
        <div class="form-group">
            <select class="form-control" v-model="currentSearchType">
                <option v-for="t in searchTypes" :value="t.value">{{t.text}}</option>
            </select>
        </div>
        <div class="input-group">
            <input type="text" class="form-control input-sm" placeholder="搜尋..." v-model="searchText">
            <span class="input-group-btn">
                <button class="btn btn-default btn-sm" type="button" @click="onSearch(currentSearchType,searchText)">Go!</button>
            </span>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: [
            'searchText',
            'onSearch',
            'checkEmpty',
            'currentSearchType',
            'getSearchType',
            'currentSearchType',
            'searchTypes',
            'searchMode',
            'dataReload'

        ]
    }
</script>
