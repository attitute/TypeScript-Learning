
// 1.CapitalizeString  首字母大写
type a1 = CapitalizeString<'handler'>       // Handler
type a2 = CapitalizeString<'parent'>        // Parent
type a3 = CapitalizeString<233>             // 233

// 题解：
type CapitalizeString<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T


// 2.FirstChar 获取字符串字面量中的第一个字符
type A = FirstChar<'BFE'> // 'B'
type B = FirstChar<'dev'> // 'd'
type C = FirstChar<''> // never

// 题解：
type FirstChar<T extends string> = T extends `${infer L}${infer R}` ? `${L}` : never


// 3.LastChar 获取字符串字面量中的最后一个字符
type D = LastChar<'BFE'> // 'E'
type E = LastChar<'dev'> // 'v'
type F = LastChar<''> // never

// 题解：
type LastChar<T extends string, Prev = never> = T extends `${infer L}${infer R}` ? LastChar<R, L> : Prev


// 4.StringToTuple 字符串转换为元组类型
type G = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type H = StringToTuple<''> // []

// 题解：
type StringToTuple<T extends string, Prev extends any[] = []> = T extends `${infer L}${infer R}` ? StringToTuple<R,[...Prev, L]> : Prev


// 5.TupleToString 将字符串类型的元素转换为字符串字面量类型
type I = TupleToString<['a', 'b', 'c']> // 'abc'
type J = TupleToString<[]>              // ''
type K = TupleToString<['a']>           // 'a'

// 题解：
type TupleToString<T extends (string|unknown)[], Prev extends string = ''> = T extends [infer L, ...infer R] ? (
    L extends string ? TupleToString<R, `${Prev}${L}`> : never
) : Prev


// 6.RepeatString<T,C> 复制字符T为字符串类型，长度为C
type L = RepeatString<'a', 3> // 'aaa'
type M = RepeatString<'a', 0> // ''

// 题解：
type RepeatString<T, C, A extends null[] = [], P extends string = ''> = C extends A['length'] ? P : RepeatString<T, C, [...A, null], `${P}${P}`>


// 7.SplitString 将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量
type A1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
type A2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
type A3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
type A4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
type A5 = SplitString<'open.flag', '-'>               // ["open.flag"]

// 题解：
type SplitString<T, K extends string, A extends string[] = []> = T extends `${infer L}${K}${infer R}` ? SplitString<R,K,[...A, L]> : [...A, T]