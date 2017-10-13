:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/html_write)).
:- use_module(library(settings)).
:- use_module(library(option)).

:- multifile http_json/1.
:- set_setting(http:cors, [*]).

:- consult('gof').

:- http_handler('/printgrid', print_grid, []).
:- http_handler('/nextgen', next_gen, []).

server(Port) :-
   http_server(http_dispatch,[port(Port)]).

print_grid(Request) :- 
    grid(X),
    prolog_to_json(json([grid=X]), Response),
    reply_json(Response).

next_gen(Request) :-
    member(method(options), Request), !,
    format('Allow: OPTIONS, POST~n'),
    format('Access-Control-Allow-Origin: *~n'),
    format('Access-Control-Allow-Headers: content-type~n'),
    reply_html_page(title('GO'), p('AHEAD')).

next_gen(Request) :-
    member(method(post), Request), !,
    http_read_json(Request, JsonIn, [json_object(term)]),
    json_to_prolog(JsonIn, PrologIn),
    PrologIn = json(G),
    life(G, Newgrid),
    % format('access-control-allow-origin: *~n'),
    % format(Newgrid, []).
    % cors_enable,
    format('Access-Control-Allow-Origin: *~n'),    
    reply_json(Newgrid).