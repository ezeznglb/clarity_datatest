#!/usr/bin/env python
"""fmuj_ltttzvj_oyjwpr_waqlk_womqnzlf_xuh_tder_ynwcoatp"""
import clarity.models as cModel
from clarity.models import Query as cQuery
from clarity.core import Clarity


cl = Clarity()
my_attr = cModel.Attribute()
query = cQuery()


# Used tables
# cliente = my_attr.use_table(
#         "da_pro", "*", table="clientes_corp", table_alias="cliente"
# )


# Query builder
# where_clause = "cod_entalfa LIKE '0182' " + "and cod_paisoalf LIKE 'ES' " + \
#                "and qnu_adultcar is not NULL"

# acargo = query.sub_query_where(
#         "cod_persctpn, qnu_adultcar", cliente, where_clause, "acargo"
# )


# Assign sql
# my_attr.sql = acargo


# Prerequisites
# def req_1():
#     assert True
# my_attr.prerequisites.append(req_1)

# Read command line
my_attr.param_reader()