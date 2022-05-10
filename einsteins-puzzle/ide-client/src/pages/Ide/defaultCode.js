const text_code_1 = `1\t #pragma comment(lib, "bdd.lib")
2\t #include "bdd.h"
3\t #include <fstream>
4\t
5\t using namespace std;`

const text_code_2 = `6\tofstream out;
7\t
8\tvoid fun(char* varset, int size); // функция, используемая для вывода решений
9\t
10\tvoid main(void)
11\t{
12\t\t// инициализация
13\t\tbdd_init(10000, 1000);
14\t\tbdd_setvarnum(N_VAR);
15\t\t
16\t\t// ->--- вводим функцию p(k, i, j) следующим образом ( pk[i][j] ):
17\t\tbdd p1[N][N];
18\t\tbdd p2[N][N];
19\t\tbdd p3[N][N];
20\t
21\t\tunsigned I = 0;
22\t\tfor (unsigned i = 0; i < N; i++)
23\t\t{
24\t\t\tfor (unsigned j = 0; j < N; j++)
25\t\t\t{
26\t\t\t\tp1[i][j] = bddtrue;
27\t\t\t\tfor (unsigned k = 0; k < LOG_N; k++) p1[i][j] &= ((j >> k) & 1) ?
28\t\t\t\t\tbdd_ithvar(I + k) : bdd_nithvar(I + k) ;
29\t\t\t\tp2[i][j] = bddtrue;
30\t\t\t\tfor (unsigned k = 0; k < LOG_N; k++) p2[i][j] &= ((j >> k) & 1) ?
31\t\t\t\t\tbdd_ithvar(I + LOG_N + k) : bdd_nithvar(I + LOG_N + k) ;
32\t\t\t\tp3[i][j] = bddtrue;
33\t\t\t\tfor (unsigned k = 0; k < LOG_N; k++) p3[i][j] &= ((j >> k) & 1) ?
34\t\t\t\t\tbdd_ithvar(I + LOG_N*2 + k) : bdd_nithvar(I + LOG_N*2 + k) ;
35\t\t\t}
36\t\t\tI += LOG_N*M;
37\t\t}
38\t\t// -<---`

const text_code_3 = `39\t// вывод результатов
40\t\tout.open("out.txt");
41\t\tunsigned satcount = (unsigned)bdd_satcount(task);
42\t\tout<<satcount<<" solutions:\\n"<<endl;
43\t\tif (satcount) bdd_allsat(task, fun);
44\t\tout.close();
45\t
46\t\tbdd_done(); // завершение работы библиотеки
47\t}
48\t
49\t// Ниже реализация функций, управляющих выводом результатов.
50\t// Рекомендуется самостоятельно с ними ознакомиться.
51\t// В собственных заданиях следует использовать эти функции
52\t// или придумать собственные.
53\t
54\tchar var[N_VAR];
55\t
56\tvoid print(void)
57\t{
58\t\tfor (unsigned i = 0; i < N; i++)
59\t\t{
60\t\t\tout<<i<<": ";
61\t\t\tfor (unsigned j = 0; j < N; j++)
62\t\t\t{
63\t\t\t\tunsigned J = i*N*LOG_N + j*LOG_N;
64\t\t\t\tunsigned num = 0;
65\t\t\t\tfor (unsigned k = 0; k < LOG_N; k++) num += (unsigned)(var[J + k] << k);
66\t\t\t\tout<<num<<' ';
67\t\t\t}
68\t\t\tout<<endl;
69\t\t}
70\t\tout<<endl;
71\t}
72\t
73\tvoid build(char* varset, unsigned n, unsigned I)
74\t{
75\t\tif (I == n - 1)
76\t\t{
77\t\t\tif (varset[I] >= 0)
78\t\t\t{
79\t\t\t\tvar[I] = varset[I];
80\t\t\t\tprint();
81\t\t\t\treturn;
82\t\t\t}
83\t\t\tvar[I] = 0;
84\t\t\tprint();
85\t\t\tvar[I] = 1;
86\t\t\tprint();
87\t\t\treturn;
88\t\t}
89\t\tif (varset[I] >= 0)
90\t\t{
91\t\t\tvar[I] = varset[I];
92\t\t\tbuild(varset, n, I + 1);
93\t\t\treturn;
94\t\t}
95\t\tvar[I] = 0;
96\t\tbuild(varset, n, I + 1);
97\t\tvar[I] = 1;
98\t\tbuild(varset, n, I + 1);
99\t}
100\t
101\tvoid fun(char* varset, int size)
102\t{
103\t\tbuild(varset, size, 0);
104\t}`


const code_1 = `#define N_VAR 18\t// число булевых переменных
#define N 3\t\t\t// число объектов
#define M 3\t\t\t// число свойств
#define LOG_N 2`

const code_2 = `\tbdd task = bddtrue; // булева функция, определяющая решение, начальное значение true`

const code_3 = `// ->--- ограничение по-умолчанию 6
\tfor (unsigned i = 0; i < N; i++)
\t{
\t\tbdd temp1 = bddfalse;
\t\tbdd temp2 = bddfalse;
\t\tbdd temp3 = bddfalse;
\t\tfor (unsigned j = 0; j < N; j++)
\t\t{
\t\t\ttemp1 |= p1[i][j];
\t\t\ttemp2 |= p2[i][j];
\t\t\ttemp3 |= p3[i][j];
\t\t}
\t\ttask &= temp1 & temp2 & temp3;
\t}
\t// -<---`

const code_4 = `// ->--- ограничение по-умолчанию 5
\tfor (unsigned j = 0; j < N; j++)
\t\tfor (unsigned i = 0; i < N - 1; i++)
\t\t\tfor (unsigned k = i + 1; k < N; k++)
\t\t\t{
\t\t\t\ttask &= p1[i][j] >> !p1[k][j];
\t\t\t\ttask &= p2[i][j] >> !p2[k][j];
\t\t\t\ttask &= p3[i][j] >> !p3[k][j];
\t\t\t}
\t// -<---`

const code_5 = `// ->--- ограничение типа 1
task &= p1[0][0]; 
// -<---`

const code_6 = `// ->--- ограничение типа 2
\tfor (unsigned i = 0; i < N; i++) task &= !( p2[i][2] ^ p3[i][0] );
\t// !(a ^ b) = (a <=> b)
\t// -<---`

const code_7 = `// ->--- ограничение типа 3
\ttask &= !p1[0][1] & !p2[N - 1][0];
\tfor (unsigned i = 0; i < N - 1; i++) task &= !( p2[i][0] ^ p1[i + 1][1] );
\t// -<---`

const code_8 = `// ->--- ограничение типа 4
\tbdd temp1 = bddtrue;
\tbdd temp2 = bddtrue;
\ttemp1 &= !p2[0][2] & !p3[N - 1][2];
\tfor (unsigned i = 0; i < N - 1; i++) temp1 &= !( p3[i][2] ^ p2[i + 1][2] );
\ttemp2 &= !p3[0][2] & !p2[N - 1][2];
\tfor (unsigned i = 0; i < N - 1; i++) temp2 &= !( p2[i][2] ^ p3[i + 1][2] );
\ttask &= temp1 | temp2;
\t// -<---`


export const code = {
    text_code_1, text_code_2, text_code_3, code_1, code_2, code_3, code_4, code_5, code_6, code_7, code_8
}

