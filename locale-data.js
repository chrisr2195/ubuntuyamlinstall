// Ubuntu autoinstall locale and keyboard layout data
// Sources: /usr/share/i18n/SUPPORTED  (locales)
//          /usr/share/X11/xkb/rules/base.xml  (keyboard layouts + variants)

const LOCALE_LIST = [
  'C.UTF-8',
  'af_ZA.UTF-8','am_ET.UTF-8','an_ES.UTF-8',
  'ar_AE.UTF-8','ar_BH.UTF-8','ar_DZ.UTF-8','ar_EG.UTF-8','ar_IN.UTF-8','ar_IQ.UTF-8',
  'ar_JO.UTF-8','ar_KW.UTF-8','ar_LB.UTF-8','ar_LY.UTF-8','ar_MA.UTF-8','ar_OM.UTF-8',
  'ar_QA.UTF-8','ar_SA.UTF-8','ar_SD.UTF-8','ar_SS.UTF-8','ar_SY.UTF-8','ar_TN.UTF-8','ar_YE.UTF-8',
  'ast_ES.UTF-8','az_AZ.UTF-8','be_BY.UTF-8','bg_BG.UTF-8',
  'bn_BD.UTF-8','bn_IN.UTF-8','bo_CN.UTF-8','bo_IN.UTF-8','br_FR.UTF-8','bs_BA.UTF-8',
  'ca_AD.UTF-8','ca_ES.UTF-8','ca_FR.UTF-8','ca_IT.UTF-8',
  'cs_CZ.UTF-8','cy_GB.UTF-8','da_DK.UTF-8',
  'de_AT.UTF-8','de_BE.UTF-8','de_CH.UTF-8','de_DE.UTF-8','de_IT.UTF-8','de_LI.UTF-8','de_LU.UTF-8',
  'el_CY.UTF-8','el_GR.UTF-8',
  'en_AG.UTF-8','en_AU.UTF-8','en_BW.UTF-8','en_CA.UTF-8','en_DK.UTF-8','en_GB.UTF-8',
  'en_HK.UTF-8','en_IE.UTF-8','en_IL.UTF-8','en_IN.UTF-8','en_NG.UTF-8','en_NZ.UTF-8',
  'en_PH.UTF-8','en_SC.UTF-8','en_SG.UTF-8','en_US.UTF-8','en_ZA.UTF-8','en_ZM.UTF-8','en_ZW.UTF-8',
  'eo.UTF-8',
  'es_AR.UTF-8','es_BO.UTF-8','es_CL.UTF-8','es_CO.UTF-8','es_CR.UTF-8','es_CU.UTF-8',
  'es_DO.UTF-8','es_EC.UTF-8','es_ES.UTF-8','es_GT.UTF-8','es_HN.UTF-8','es_MX.UTF-8',
  'es_NI.UTF-8','es_PA.UTF-8','es_PE.UTF-8','es_PR.UTF-8','es_PY.UTF-8','es_SV.UTF-8',
  'es_US.UTF-8','es_UY.UTF-8','es_VE.UTF-8',
  'et_EE.UTF-8','eu_ES.UTF-8','eu_FR.UTF-8','fa_IR.UTF-8','fi_FI.UTF-8','fil_PH.UTF-8',
  'fr_BE.UTF-8','fr_CA.UTF-8','fr_CH.UTF-8','fr_FR.UTF-8','fr_LU.UTF-8',
  'fur_IT.UTF-8','fy_NL.UTF-8','ga_IE.UTF-8','gd_GB.UTF-8','gl_ES.UTF-8',
  'gu_IN.UTF-8','gv_GB.UTF-8','he_IL.UTF-8','hi_IN.UTF-8','hr_HR.UTF-8',
  'hsb_DE.UTF-8','ht_HT.UTF-8','hu_HU.UTF-8','hy_AM.UTF-8',
  'id_ID.UTF-8','ig_NG.UTF-8','is_IS.UTF-8','it_CH.UTF-8','it_IT.UTF-8','iu_CA.UTF-8',
  'ja_JP.UTF-8','ka_GE.UTF-8','kab_DZ.UTF-8','kk_KZ.UTF-8','kl_GL.UTF-8',
  'km_KH.UTF-8','kn_IN.UTF-8','ko_KR.UTF-8','ku_TR.UTF-8','kw_GB.UTF-8','ky_KG.UTF-8',
  'lb_LU.UTF-8','lg_UG.UTF-8','ln_CD.UTF-8','lo_LA.UTF-8','lt_LT.UTF-8','lv_LV.UTF-8',
  'mai_IN.UTF-8','mg_MG.UTF-8','mi_NZ.UTF-8','mk_MK.UTF-8','ml_IN.UTF-8',
  'mn_MN.UTF-8','mr_IN.UTF-8','ms_MY.UTF-8','mt_MT.UTF-8','my_MM.UTF-8',
  'nb_NO.UTF-8','ne_NP.UTF-8','nl_AW.UTF-8','nl_BE.UTF-8','nl_NL.UTF-8','nn_NO.UTF-8',
  'oc_FR.UTF-8','om_ET.UTF-8','om_KE.UTF-8','or_IN.UTF-8','os_RU.UTF-8',
  'pa_IN.UTF-8','pa_PK.UTF-8','pl_PL.UTF-8','ps_AF.UTF-8','pt_BR.UTF-8','pt_PT.UTF-8',
  'ro_RO.UTF-8','ru_RU.UTF-8','ru_UA.UTF-8','rw_RW.UTF-8',
  'sa_IN.UTF-8','sc_IT.UTF-8','sd_IN.UTF-8','se_NO.UTF-8','si_LK.UTF-8',
  'sk_SK.UTF-8','sl_SI.UTF-8',
  'so_DJ.UTF-8','so_ET.UTF-8','so_KE.UTF-8','so_SO.UTF-8',
  'sq_AL.UTF-8','sq_MK.UTF-8','sr_ME.UTF-8','sr_RS.UTF-8',
  'ss_ZA.UTF-8','st_ZA.UTF-8','sv_FI.UTF-8','sv_SE.UTF-8','sw_KE.UTF-8','sw_TZ.UTF-8',
  'ta_IN.UTF-8','ta_LK.UTF-8','te_IN.UTF-8','tg_TJ.UTF-8','th_TH.UTF-8',
  'ti_ER.UTF-8','ti_ET.UTF-8','tk_TM.UTF-8','tl_PH.UTF-8','tn_ZA.UTF-8',
  'tr_CY.UTF-8','tr_TR.UTF-8','ts_ZA.UTF-8','tt_RU.UTF-8',
  'ug_CN.UTF-8','uk_UA.UTF-8','ur_IN.UTF-8','ur_PK.UTF-8','uz_UZ.UTF-8',
  've_ZA.UTF-8','vi_VN.UTF-8','wa_BE.UTF-8','wo_SN.UTF-8','xh_ZA.UTF-8',
  'yi_US.UTF-8','yo_NG.UTF-8','yue_HK.UTF-8',
  'zh_CN.UTF-8','zh_HK.UTF-8','zh_SG.UTF-8','zh_TW.UTF-8','zu_ZA.UTF-8',
];

// [code, display name, [[variant-code, variant-name], ...]]
const KB_LAYOUTS = [
  ['af',    'Afghani',                 [['ps','Pashto'],['uz','Uzbek'],['olpc-ps','Pashto (OLPC)'],['olpc-fa','Dari (OLPC)'],['olpc-uz','Uzbek (OLPC)']]],
  ['al',    'Albanian',                []],
  ['am',    'Armenian',                [['eastern','Eastern'],['western','Western'],['eastern-alt','Eastern alt.'],['phonetic','Phonetic'],['phonetic-alt','Phonetic alt.'],['olpc-phonetic','Phonetic (OLPC)']]],
  ['ara',   'Arabic',                  [['azerty','AZERTY'],['azerty_digits','AZERTY with digits'],['digits','Digits'],['qwerty','QWERTY'],['qwerty_digits','QWERTY with digits'],['buckwalter','Buckwalter']]],
  ['at',    'German (Austria)',        [['mac','Macintosh'],['mac_neo','Macintosh Neo'],['nodeadkeys','No dead keys'],['sundeadkeys','Sun dead keys']]],
  ['az',    'Azerbaijani',             [['cyrillic','Cyrillic']]],
  ['ba',    'Bosnian',                 [['unicode','Unicode'],['unicodeus','Unicode/US'],['alternatequotes','Alternate quotes']]],
  ['bd',    'Bangla',                  [['probhat','Probhat']]],
  ['be',    'Belgian',                 [['iso-alternate','ISO alternate'],['nodeadkeys','No dead keys'],['sundeadkeys','Sun dead keys'],['wang','Wang 724 AZERTY']]],
  ['bg',    'Bulgarian',               [['bas_phonetic','Phonetic (BAS)'],['phonetic','Phonetic']]],
  ['br',    'Portuguese (Brazil)',     [['dvorak','Dvorak'],['nodeadkeys','No dead keys'],['nativo','Nativo'],['nativo-us','Nativo/US'],['nativo-epo','Nativo/Esperanto']]],
  ['bt',    'Dzongkha',                []],
  ['bw',    'Tswana',                  []],
  ['by',    'Belarusian',              [['latin','Latin'],['legacy','Legacy'],['oss','OSS'],['oss_latin','OSS Latin']]],
  ['ca',    'English (Canada)',        [['fr-dvorak','French Dvorak'],['fr-legacy','French Legacy'],['ike','Inuktitut'],['multi','Multilingual'],['multi-2gr','Multilingual 2nd Gr.'],['multix','Multilingual extended']]],
  ['cd',    'French (DRC)',            []],
  ['ch',    'German (Switzerland)',    [['fr','French'],['fr_mac','French Macintosh'],['fr_nodeadkeys','French, no dead keys'],['it','Italian'],['it_mac','Italian Macintosh'],['it_nodeadkeys','Italian, no dead keys'],['nodeadkeys','No dead keys'],['mac_de','German Macintosh'],['mac_fr','French Macintosh'],['sundeadkeys','Sun dead keys']]],
  ['cm',    'Cameroon Multilingual',   [['azerty','AZERTY'],['dvorak','Dvorak'],['fr','French'],['qwerty','QWERTY']]],
  ['cn',    'Chinese',                 [['tib','Tibetan'],['tib_asciinum','Tibetan (ASCII numerals)'],['uig','Uyghur']]],
  ['cz',    'Czech',                   [['bksl','With backslash'],['dvorak-ucw','Dvorak UCW'],['nodeadkeys','No dead keys'],['qwerty','QWERTY'],['qwerty_bksl','QWERTY with backslash'],['ucw','Extended QWERTY'],['with_two_acute','Two acute accents']]],
  ['de',    'German',                  [['deadacute','Dead acute'],['deadgreve','Dead grave'],['deadtilde','Dead tilde'],['dvorak','Dvorak'],['mac','Macintosh'],['mac_nodeadkeys','Macintosh, no dead keys'],['neo','Neo 2'],['nodeadkeys','No dead keys'],['qwerty','QWERTY'],['ro','Romanian'],['ro_nodeadkeys','Romanian, no dead keys'],['T3','T3 (tele typewriter)']]],
  ['dk',    'Danish',                  [['dvorak','Dvorak'],['mac','Macintosh'],['mac_nodeadkeys','Macintosh, no dead keys'],['nodeadkeys','No dead keys'],['sundeadkeys','Sun dead keys'],['winkeys','Windows keys']]],
  ['dz',    'Tamazight',               [['ar','Arabic'],['tifinagh','Tifinagh'],['tifinagh-ircam','Tifinagh IRCAM'],['tifinagh-phonetic','Tifinagh phonetic'],['tifinagh-extended','Tifinagh extended']]],
  ['ee',    'Estonian',                [['dvorak','Dvorak'],['mac','Macintosh'],['nodeadkeys','No dead keys'],['us','US keyboard']]],
  ['epo',   'Esperanto',               [['legacy','Legacy']]],
  ['es',    'Spanish',                 [['ast','Asturian'],['cat','Catalan'],['deadtilde','Dead tilde'],['dvorak','Dvorak'],['mac','Macintosh'],['nodeadkeys','No dead keys'],['sundeadkeys','Sun dead keys'],['winkeys','Windows keys']]],
  ['et',    'Amharic',                 []],
  ['eu',    'Basque',                  []],
  ['fi',    'Finnish',                 [['classic','Classic'],['mac','Macintosh'],['nodeadkeys','No dead keys'],['smi','Northern Sami'],['sundeadkeys','Sun dead keys'],['winkeys','Windows keys']]],
  ['fo',    'Faroese',                 [['mac','Macintosh'],['nodeadkeys','No dead keys']]],
  ['fr',    'French',                  [['afnor','AFNOR'],['bepo','Bépo'],['bepo_latin9','Bépo Latin-9'],['bre','Breton'],['dvorak','Dvorak'],['latin9','Latin-9'],['latin9_nodeadkeys','Latin-9, no dead keys'],['mac','Macintosh'],['nodeadkeys','No dead keys'],['oss','OSS typographical'],['oss_latin9','OSS Latin-9'],['oss_nodeadkeys','OSS, no dead keys']]],
  ['gb',    'English (UK)',            [['colemak','Colemak'],['dvorak','Dvorak'],['dvorakukp','Dvorak UKP'],['extd','Extended (Winkeys)'],['intl','International'],['mac','Macintosh'],['mac_intl','Macintosh international'],['pl','Polish phonetic']]],
  ['ge',    'Georgian',                [['ergonomic','Ergonomic'],['mess','MESS'],['os','Ossetian'],['ru','Russian'],['oswin','OS/Windows']]],
  ['gh',    'Ghanaian',                [['akan','Akan'],['avn','Avatime'],['ewe','Ewe'],['fula','Fula'],['ga','Ga'],['generic','Generic'],['gillbt','GILLBT'],['hausa','Hausa']]],
  ['gr',    'Greek',                   [['extended','Extended'],['nodeadkeys','No dead keys'],['polytonic','Polytonic'],['simple','Simple']]],
  ['hr',    'Croatian',                [['unicode','Unicode'],['unicodeus','Unicode/US'],['alternatequotes','Alternate quotes'],['nodeadkeys','No dead keys']]],
  ['hu',    'Hungarian',               [['nodeadkeys','No dead keys'],['qwerty','QWERTY'],['standard','Standard']]],
  ['id',    'Indonesian',              []],
  ['ie',    'Irish',                   [['CloGaelach','CloGaelach'],['ogam','Ogham'],['ogam_is434','Ogham IS 434'],['UnicodeExpert','Unicode Expert']]],
  ['il',    'Hebrew',                  [['biblical','Biblical Hebrew'],['lyx','lyx'],['phonetic','Phonetic']]],
  ['in',    'Indian',                  [['ben','Bengali'],['ben_gitanjali','Bengali Gitanjali'],['ben_inscript','Bengali Inscript'],['bolnagri','Hindi Bolnagri'],['bra','Brahmi'],['devanagari-inscript','Devanagari Inscript'],['guj','Gujarati'],['guru','Gurmukhi'],['kan','Kannada'],['mal','Malayalam'],['mal_enhanced','Malayalam Enhanced'],['mar','Marathi'],['ori','Oriya'],['ori-inscript','Oriya Inscript'],['tam','Tamil'],['tel','Telugu'],['urd-phonetic','Urdu Phonetic'],['urd-winkeys','Urdu Winkeys']]],
  ['iq',    'Iraqi',                   []],
  ['ir',    'Iranian',                 [['ave','Avestan'],['ku','Kurdish'],['ku_alt','Kurdish alt.'],['ku_ara','Kurdish Arabic-based'],['ku_f','Kurdish F'],['pes_keypad','Persian with keypad']]],
  ['is',    'Icelandic',               [['dvorak','Dvorak'],['mac','Macintosh'],['mac_legacy','Macintosh legacy'],['nodeadkeys','No dead keys'],['sundeadkeys','Sun dead keys'],['winkeys','Windows keys']]],
  ['it',    'Italian',                 [['fur','Friulian'],['geo','Georgian'],['ibm','IBM'],['mac','Macintosh'],['nodeadkeys','No dead keys'],['scn','Sicilian'],['sundeadkeys','Sun dead keys'],['us','US keyboard'],['winkeys','Windows keys']]],
  ['jp',    'Japanese',                [['kana','Kana'],['kana86','Kana 86'],['OADG109A','OADG 109A']]],
  ['ke',    'Kenyan',                  [['kik','Kikuyu']]],
  ['kg',    'Kyrgyz',                  [['phonetic','Phonetic']]],
  ['kh',    'Khmer',                   []],
  ['kr',    'Korean',                  []],
  ['kz',    'Kazakh',                  [['ext','Extended'],['latin','Latin'],['ruskaz','Russian/Kazakh'],['kazrus','Kazakh/Russian']]],
  ['la',    'Lao',                     [['stea','STEA standard']]],
  ['latam', 'Spanish (Latin America)', [['colemak','Colemak'],['deadtilde','Dead tilde'],['dvorak','Dvorak'],['nodeadkeys','No dead keys'],['sundeadkeys','Sun dead keys']]],
  ['lk',    'Sinhala',                 [['tam_TAB','Tamil (TAB)'],['tam_unicode','Tamil (Unicode)']]],
  ['lt',    'Lithuanian',              [['ibm','IBM'],['lekp','LEKP'],['lekpa','LEKPa'],['ratise','Ratisė'],['sgs','Samogitian'],['std','Standard'],['us','US keyboard']]],
  ['lv',    'Latvian',                 [['apostrophe','Apostrophe'],['f','F keyboard'],['fkey','F key'],['minuskeydead','Minus key dead'],['tilde','Tilde']]],
  ['ma',    'Arabic (Morocco)',        [['french','French'],['tifinagh','Tifinagh'],['tifinagh-extended','Tifinagh Extended'],['tifinagh-ircam','Tifinagh IRCAM'],['tifinagh-phonetic','Tifinagh Phonetic']]],
  ['mao',   'Maori',                   []],
  ['md',    'Moldavian',               [['gag','Gagauz']]],
  ['me',    'Montenegrin',             [['cyrillicyz','Cyrillic YZ'],['latinalternatequotes','Latin alternate quotes'],['latinunicode','Latin Unicode'],['latinunicodeus','Latin Unicode/US'],['latinyz','Latin YZ']]],
  ['mk',    'Macedonian',              [['nodeadkeys','No dead keys']]],
  ['ml',    'Bambara',                 [['fr-oss','French OSS'],['us-intl','US International']]],
  ['mm',    'Burmese',                 []],
  ['mn',    'Mongolian',               []],
  ['mt',    'Maltese',                 [['alt-gb','Alternate GB'],['alt-us','Alternate US'],['us','US keyboard']]],
  ['mv',    'Dhivehi',                 [['phonetic','Phonetic']]],
  ['ng',    'Nigerian',                [['hausa','Hausa'],['igbo','Igbo'],['yoruba','Yoruba']]],
  ['nl',    'Dutch',                   [['mac','Macintosh'],['std','Standard'],['sundeadkeys','Sun dead keys'],['winkeys','Windows keys']]],
  ['no',    'Norwegian',               [['colemak','Colemak'],['dvorak','Dvorak'],['mac','Macintosh'],['mac_nodeadkeys','Macintosh, no dead keys'],['nodeadkeys','No dead keys'],['smi','Northern Sami'],['smi_nodeadkeys','Northern Sami, no dead keys'],['sundeadkeys','Sun dead keys'],['winkeys','Windows keys']]],
  ['np',    'Nepali',                  [['rom','Romanized']]],
  ['ph',    'Filipino',                [['capewell-colemak','Capewell-Colemak'],['capewell-dvorak','Capewell-Dvorak'],['colemak','Colemak'],['dvorak','Dvorak']]],
  ['pk',    'Urdu (Pakistan)',         [['ara','Arabic'],['bra','Brahmi'],['ur-phonetic','Urdu Phonetic'],['urd-crulp','Urdu CRULP'],['urd-nla','Urdu NLA']]],
  ['pl',    'Polish',                  [['colemak','Colemak'],['csb','Kashubian'],['dvorak','Dvorak'],['dvp','Programmer Dvorak'],['legacy','Legacy'],['qwertz','QWERTZ'],['ru_phonetic_dvorak','Russian Phonetic Dvorak']]],
  ['pt',    'Portuguese',              [['mac','Macintosh'],['mac_nodeadkeys','Macintosh, no dead keys'],['nativo','Nativo'],['nativo-epo','Nativo/Esperanto'],['nativo-us','Nativo/US'],['nodeadkeys','No dead keys'],['sundeadkeys','Sun dead keys'],['winkeys','Windows keys']]],
  ['ro',    'Romanian',                [['cedilla','Comma/Cedilla'],['crh_dobrogea','Crimean Tatar (Dobruca)'],['crh_f','Crimean Tatar F'],['crh_tr','Crimean Tatar, Turkish F'],['std','Standard'],['winkeys','Windows keys']]],
  ['rs',    'Serbian',                 [['alternatequotes','Alternate quotes'],['latin','Latin'],['latinunicode','Latin Unicode'],['latinunicodeus','Latin Unicode/US'],['latinyz','Latin YZ'],['latinalternatequotes','Latin alternate quotes']]],
  ['ru',    'Russian',                 [['bak','Bashkir'],['chu','Old Church Slavonic'],['cv','Chuvash'],['cv_latin','Chuvash Latin'],['dos','DOS'],['kom','Komi'],['os_legacy','Ossetian legacy'],['os_winkeys','Ossetian Winkeys'],['phonetic','Phonetic'],['phonetic_winkeys','Phonetic Winkeys'],['sah','Yakut'],['srp','Serbian'],['tt','Tatar'],['udm','Udmurt'],['xal','Kalmyk']]],
  ['se',    'Swedish',                 [['dvorak','Dvorak'],['mac','Macintosh'],['mac_nodeadkeys','Macintosh, no dead keys'],['nodeadkeys','No dead keys'],['smi','Northern Sami'],['sundeadkeys','Sun dead keys'],['svdvorak','Swedish Dvorak']]],
  ['si',    'Slovenian',               [['alternatequotes','Alternate quotes'],['nodeadkeys','No dead keys'],['us','US keyboard']]],
  ['sk',    'Slovak',                  [['bksl','With backslash'],['nodeadkeys','No dead keys'],['qwerty','QWERTY'],['qwerty_bksl','QWERTY with backslash'],['unicode','Unicode'],['winkeys','Windows keys']]],
  ['sn',    'Wolof',                   []],
  ['sy',    'Arabic (Syria)',          [['ku','Kurdish'],['ku_alt','Kurdish alt.'],['ku_ara','Kurdish Arabic-based'],['ku_f','Kurdish F'],['syc','Syriac'],['syc_phonetic','Syriac phonetic']]],
  ['th',    'Thai',                    [['pat','Pattachote'],['tis','TIS 820-2531']]],
  ['tj',    'Tajik',                   []],
  ['tm',    'Turkmen',                 [['alt','Alternate']]],
  ['tr',    'Turkish',                 [['alt','Alternate'],['crh','Crimean Tatar'],['crh_alt','Crimean Tatar alt.'],['crh_f','Crimean Tatar F'],['f','F keyboard'],['intl','International'],['ku','Kurdish'],['ku_alt','Kurdish alt.'],['ku_ara','Kurdish Arabic-based'],['ku_f','Kurdish F'],['otf','Ottoman F'],['sundeadkeys','Sun dead keys']]],
  ['tw',    'Taiwanese',               [['indigenous','Indigenous'],['saisiyat','Saisiyat']]],
  ['tz',    'Swahili (Tanzania)',      []],
  ['ua',    'Ukrainian',               [['crh','Crimean Tatar'],['crh_alt','Crimean Tatar alt.'],['homophonic','Homophonic'],['latin','Latin'],['phonetic','Phonetic'],['phonetic_dvorak','Phonetic Dvorak'],['rstu','RSTU'],['rstu_ru','RSTU/Russian'],['typewriter','Typewriter'],['typewriter-legacy','Typewriter legacy'],['winkeys','Windows keys']]],
  ['us',    'English (US)',            [['intl','International (dead keys)'],['alt-intl','Alt. international'],['colemak','Colemak'],['dvorak','Dvorak'],['dvp','Programmer Dvorak'],['euro','With euro on 5'],['mac','Macintosh'],['mac_intl','Macintosh international'],['altgr-intl','International (AltGr dead keys)'],['workman','Workman'],['workman-intl','Workman international'],['hhk','Happy Hacking'],['norman','Norman'],['rus','Russian phonetic'],['haw','Hawaiian'],['chr','Cherokee']]],
  ['uz',    'Uzbek',                   [['latin','Latin']]],
  ['vn',    'Vietnamese',              []],
  ['za',    'South African',           []],
];

const KB_TOGGLES = [
  ['grp:alt_shift_toggle',   'Both Alt+Shift keys'],
  ['grp:ctrl_shift_toggle',  'Both Ctrl+Shift keys'],
  ['grp:caps_toggle',        'CapsLock'],
  ['grp:lalt_toggle',        'Left Alt'],
  ['grp:lctrl_toggle',       'Left Ctrl'],
  ['grp:lshift_toggle',      'Left Shift'],
  ['grp:lwin_toggle',        'Left Windows key'],
  ['grp:menu_toggle',        'Menu key'],
  ['grp:ralt_toggle',        'Right Alt (AltGr)'],
  ['grp:rctrl_toggle',       'Right Ctrl'],
  ['grp:rshift_toggle',      'Right Shift'],
  ['grp:rwin_toggle',        'Right Windows key'],
  ['grp:scrolllock_toggle',  'Scroll Lock'],
  ['grp:shift_caps_toggle',  'Shift+CapsLock'],
];

function initLocaleDatelist() {
  const dl = document.getElementById('locale-list');
  LOCALE_LIST.forEach(loc => {
    const opt = document.createElement('option');
    opt.value = loc;
    dl.appendChild(opt);
  });
}

function initLayoutDatelist() {
  const dl = document.getElementById('kblayout-list');
  KB_LAYOUTS.forEach(([code, name]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.label = name;
    dl.appendChild(opt);
  });
}

function initToggleDatelist() {
  const dl = document.getElementById('kbtoggle-list');
  KB_TOGGLES.forEach(([code, name]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.label = name;
    dl.appendChild(opt);
  });
}

function updateKbVariants() {
  const layout = document.getElementById('kbLayout').value.trim();
  const dl = document.getElementById('kbvariant-list');
  dl.innerHTML = '';
  const entry = KB_LAYOUTS.find(([code]) => code === layout);
  if (entry) {
    entry[2].forEach(([code, name]) => {
      const opt = document.createElement('option');
      opt.value = code;
      opt.label = name;
      dl.appendChild(opt);
    });
  }
}
