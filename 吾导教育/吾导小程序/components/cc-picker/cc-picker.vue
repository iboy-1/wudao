<template>
	<picker class="ccp" @change="change" :range-key="k" :value="Index" :range="Range">
		<view>{{find(Value)}}</view>
	</picker>
</template>

<script>
	export default {
		name: 'ccPicker',
		props: {
			range: {
				type: Array,
				default: []
			},
			k: {
				type: String,
				default: 'K'
			},
			v: {
				type: String,
				default: 'V'
			},
			value: {
				type: String
			},
			null_str: {
				type: String,
				default: '',
			},
			null_val: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				Value: this.value
			}
		},
		methods: {
			change(e) {
				this.Value = this.Range[parseInt(e.target.value)][this.v];
				this.$emit('picker_change', { new_v: this.Value, new_k: this.find(this.Value) });
			},
			find() {
				if (this.Value) {
					for (var i = 0; i < this.Range.length; i++) {
						if (this.Range[i][this.v] == this.Value) {
							return this.Range[i][this.k];
						}
					}
				}
				return this.null_str ? this.null_str : "请选择";
			}
		},
		computed: {
			Index() {
				if (this.Value) {
					for (var i = 0; i < this.Range.length; i++) {
						if (this.Range[i][this.v] == this.Value) {
							return i;
							break;
						}
					}
				}
				return -1;
			},
			Range() {
				if(this.null_str){
					return JSON.parse(`[{"${this.k}": "${this.null_str}", "${this.v}": "${this.null_val}" }]`).concat(this.range);
				}
				else {
					return this.range;
				}
			}
		},
		watch: {
			value(newVal) {
				this.Value = newVal
			},
			Value(newVal) {
				this.$emit('input', newVal)
			}
		}
	}
</script>

<style>
	.ccp{
		text-align: right;
		font-size: 28upx;
	}
	.ccp view{
		font-size: 26rpx;
		color: #555555;
		line-height: 64upx;
		float: right;
		width: calc(100%);
		text-align: right;
	}
</style>