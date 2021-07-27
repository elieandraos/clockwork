import { url } from './../src/index';

test('passes with valid urls', () => {
    expect( url('https://www.google.com') ).toBe(true);
    expect( url('http://www.google.com') ).toBe(true);
    expect( url('www.google.com') ).toBe(true);
    expect( url('google.com') ).toBe(true);
});

test('fails with invalid url', () => {
    expect( url('https:/www.google') ).toBe(false);
    expect( url('htt://www.google.com') ).toBe(false);
    expect( url('google.') ).toBe(false);
    expect( url('www.google') ).toBe(false);
    expect( url('www.google.') ).toBe(false);
    expect( url('') ).toBe(false);
    expect( url(null) ).toBe(false);
    expect( url(undefined) ).toBe(false);
});