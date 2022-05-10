text_code_1 = '''#pragma comment(lib, "bdd.lib")
#include "bdd.h"
#include <fstream>

using namespace std;'''

text_code_2 = '''ofstream out;

void fun(char* varset, int size); // функция, используемая для вывода решений

int main(void)
{
\t// инициализация
\tbdd_init(10000, 1000);
\tbdd_setvarnum(N_VAR);
\t
\t// ->--- вводим функцию p(k, i, j) следующим образом ( pk[i][j] ):
\tbdd p1[N][N];
\tbdd p2[N][N];
\tbdd p3[N][N];

\tunsigned I = 0;
\tfor (unsigned i = 0; i < N; i++)
\t{
\t\tfor (unsigned j = 0; j < N; j++)
\t\t{
\t\t\tp1[i][j] = bddtrue;
\t\t\tfor (unsigned k = 0; k < LOG_N; k++) p1[i][j] &= ((j >> k) & 1) ?
\t\t\t\tbdd_ithvar(I + k) : bdd_nithvar(I + k) ;
\t\t\tp2[i][j] = bddtrue;
\t\t\tfor (unsigned k = 0; k < LOG_N; k++) p2[i][j] &= ((j >> k) & 1) ?
\t\t\t\tbdd_ithvar(I + LOG_N + k) : bdd_nithvar(I + LOG_N + k) ;
\t\t\tp3[i][j] = bddtrue;
\t\t\tfor (unsigned k = 0; k < LOG_N; k++) p3[i][j] &= ((j >> k) & 1) ?
\t\t\t\tbdd_ithvar(I + LOG_N*2 + k) : bdd_nithvar(I + LOG_N*2 + k) ;
\t\t}
\t\tI += LOG_N*M;
\t}
\t// -<---'''

text_code_3 = '''// вывод результатов
\tout.open("out.txt");
\tunsigned satcount = (unsigned)bdd_satcount(task);
\tout<<satcount<<" solutions:\\n"<<endl;
\tif (satcount) bdd_allsat(task, fun);
\tout.close();

\tbdd_done(); // завершение работы библиотеки
}

// Ниже реализация функций, управляющих выводом результатов.
// Рекомендуется самостоятельно с ними ознакомиться.
// В собственных заданиях следует использовать эти функции
// или придумать собственные.

char var[N_VAR];

void print(void)
{
\tfor (unsigned i = 0; i < N; i++)
\t{
\t\tout<<i<<": ";
\t\tfor (unsigned j = 0; j < N; j++)
\t\t{
\t\t\tunsigned J = i*N*LOG_N + j*LOG_N;
\t\t\tunsigned num = 0;
\t\t\tfor (unsigned k = 0; k < LOG_N; k++) num += (unsigned)(var[J + k] << k);
\t\t\tout<<num<<' ';
\t\t}
\t\tout<<endl;
\t}
\tout<<endl;
}

void build(char* varset, unsigned n, unsigned I)
{
\tif (I == n - 1)
\t{
\t\tif (varset[I] >= 0)
\t\t{
\t\t\tvar[I] = varset[I];
\t\t\tprint();
\t\t\treturn;
\t\t}
\t\tvar[I] = 0;
\t\tprint();
\t\tvar[I] = 1;
\t\tprint();
\t\treturn;
\t}
\tif (varset[I] >= 0)
\t{
\t\tvar[I] = varset[I];
\t\tbuild(varset, n, I + 1);
\t\treturn;
\t}
\tvar[I] = 0;
\tbuild(varset, n, I + 1);
\tvar[I] = 1;
\tbuild(varset, n, I + 1);
}

void fun(char* varset, int size)
{
\tbuild(varset, size, 0);
}'''