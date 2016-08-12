ace.define("ace/mode/impala_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){var e="ADD|AGGREGATE|ALL|AND|API_VERSION|AS|ASC|AVRO|BINARY|BY|CACHED|CASE|CHANGE|CHAR|CLASS|CLOSE_FN|COLUMN|COLUMNS|COMMENT|COMPUTE|CREATE|CROSS|DATA|DESC|DATABASE|DATABASES|DECIMAL|DELIMITED|DESCRIBE|DISTINCT|DIV|DROP|ELSE|END|ESCAPED|EXISTS|EXPLAIN|EXTERNAL|FALSE|FIELDS|FILEFORMAT|FINALIZE_FN|FIRST|FORMAT|FORMATTED|FROM|FULL|FUNCTION|FUNCTIONS|GROUP|HAVING|IF|INIT_FN|INNER|INPATH|INSERT|INTEGER|INTERMEDIATE|INTERVAL|INTO|INVALIDATE|JOIN|LAST|LEFT|LIKE|LIMIT|LINES|LOAD|LOCATION|MERGE_FN|METADATA|NOT|NULL|NULLS|OFFSET|ON|OR|ORDER|OUTER|OVERWRITE|PARQUET|PARTITION|PARTITIONED|PARTITIONS|PREPARE_FN|PRODUCED|REAL|REFRESH|REGEXP|RENAME|REPLACE|RETURNS|RIGHT|RLIKE|ROW|SCHEMA|SCHEMAS|SELECT|SEMI|SERDEPROPERTIES|SERIALIZE_FN|SHOW|STATS|STORED|STRAIGHT_JOIN|SYMBOL|TABLE|TABLES|TBLPROPERTIES|TERMINATED|THEN|TO|TRUE|UNCACHED|UNION|UPDATE_FN|USE|USING|VIEW|WHEN|WHERE|WITH",t="TRUE|FALSE|NULL",n="ABS|ACOS|ASCII|ASIN|ATAN|AVG|BIN|CAST|CEIL|CEILING|COALESCE|CONCAT|CONCAT_WS|COUNT|CONV|COS|DATE_ADD|DATE_SUB|DATEDIFF|DAY|DAYNAME|DAYOFMONTH|DAYOFWEEK|DEGREES|E|EXP|FIND_IN_SET|FLOOR|FNV_HASH|FROM_UNIXTIME|FROM_UTC_TIMESTAMP|GREATEST|GROUP_CONCAT|HEX|HOUR|IF|INITCAP|INSTR|ISNULL|LCASE|LEAST|LENGTH|LN|LOCATE|LOG|LOG10|LOG2|LOWER|LPAD|LTRIM|MAX|MIN|MINUTE|MONTH|NDV|NEGATIVE|NOW|NVL|PARSE_URL|PI|PMOD|POSITIVE|POW|POWER|QUOTIENT|RADIANS|RAND|REGEXP_EXTRACT|REPEAT|REVERSE|ROUND|RPAD|RTRIM|SECOND|SIGN|SIN|SPACE|SQRT|SUBSTR|SUBSTRING|SUM|TAN|TO_DATE|TO_UTC_TIMESTAMP|TRANSLATE|TRIM|UCASE|UNHEX|UNIX_TIMESTAMP|UPPER|USER|WEEKOFYEAR|YEAR|DENSE_RANK|FIRST_VALUE|LAG|LAST_VALUE|LEAD|OVER|RANK|ROW_NUMBER|WINDOW",r="TINYINT|SMALLINT|INT|BIGINT|BOOLEAN|FLOAT|DOUBLE|STRING|TIMESTAMP|PARQUETFILE|SEQUENCEFILE|TEXTFILE|RCFILE",i=this.createKeywordMapper({"support.function":n,keyword:e,"constant.language":t,"storage.type":r},"identifier",!0);this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"comment",start:"/\\*",end:"\\*/"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:i,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]},this.normalizeRules()};s.metaData={fileTypes:["iql"],name:"Impala",scopeName:"source.impala"},r.inherits(s,i),t.ImpalaHighlightRules=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(o,s),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var i=this._getFoldWidgetBase(e,t,n);return!i&&this.startRegionRe.test(r)?"start":i},this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var s=i.match(this.foldingStartMarker);if(s){var o=s.index;if(s[1])return this.openingBracketBlock(e,s[1],n,o);var u=e.getCommentFoldRange(n,o+s[0].length,1);return u&&!u.isMultiLine()&&(r?u=this.getSectionRange(e,n):t!="all"&&(u=null)),u}if(t==="markbegin")return;var s=i.match(this.foldingStopMarker);if(s){var o=s.index+s[0].length;return s[1]?this.closingBracketBlock(e,s[1],n,o):e.getCommentFoldRange(n,o,-1)}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),s=t,o=n.length;t+=1;var u=t,a=e.getLength();while(++t<a){n=e.getLine(t);var f=n.search(/\S/);if(f===-1)continue;if(r>f)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=s)break;if(l.isMultiLine())t=l.end.row;else if(r==f)break}u=t}return new i(s,o,u,e.getLine(u).length)},this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/),s=e.getLength(),o=n,u=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;while(++n<s){t=e.getLine(n);var f=u.exec(t);if(!f)continue;f[1]?a--:a++;if(!a)break}var l=n;if(l>o)return new i(o,r,l,t.length)}}.call(o.prototype)}),ace.define("ace/mode/folding/sqlserver",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./cstyle").FoldMode,o=t.FoldMode=function(){};r.inherits(o,s),function(){this.foldingStartMarker=/(\bCASE\b|\bBEGIN\b)|^\s*(\/\*)/i,this.startRegionRe=/^\s*(\/\*|--)#?region\b/,this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var s=i.match(this.foldingStartMarker);if(s){var o=s.index;if(s[1])return this.getBeginEndBlock(e,n,o,s[1]);var u=e.getCommentFoldRange(n,o+s[0].length,1);return u&&!u.isMultiLine()&&(r?u=this.getSectionRange(e,n):t!="all"&&(u=null)),u}if(t==="markbegin")return;return},this.getBeginEndBlock=function(e,t,n,r){var s={row:t,column:n+r.length},o=e.getLength(),u,a=1,f=/(\bCASE\b|\bBEGIN\b)|(\bEND\b)/i;while(++t<o){u=e.getLine(t);var l=f.exec(u);if(!l)continue;l[1]?a++:a--;if(!a)break}var c=t;if(c>s.row)return new i(s.row,s.column,c,u.length)}}.call(o.prototype)}),ace.define("ace/mode/impala",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/impala_highlight_rules","ace/mode/folding/sqlserver"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,s=e("./impala_highlight_rules").ImpalaHighlightRules,o=e("./folding/sqlserver").FoldMode,u=function(){this.HighlightRules=s,this.foldingRules=new o};r.inherits(u,i),function(){this.lineCommentStart="--",this.$id="ace/mode/impala",this.getCompletions=function(e,t,n,r){var i=this.$keywordList||this.$createKeywordList();return i.map(function(e){return{ignoreCase:!0,name:e,value:e,upperCaseValue:e.toUpperCase(),score:1,meta:"keyword"}})}}.call(u.prototype),t.Mode=u})